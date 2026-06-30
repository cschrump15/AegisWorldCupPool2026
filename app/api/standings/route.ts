import { NextResponse } from 'next/server'
import { POOL } from '@/lib/pool'

const ESPN_STANDINGS_URL =
  'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings'
const ESPN_SCOREBOARD_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=200&dates=20260628-20260720'

export interface TeamStanding {
  espnName: string
  gamesPlayed: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  stage: string
}

export interface GroupStandings {
  group: string
  teams: TeamStanding[]
}

export interface PoolResult {
  members: string
  team: string
  flag: string
  bg: string
  text: string
  border: string
  group: string
  gamesPlayed: number
  goalsFor: number
  points: number
  wins: number
  draws: number
  losses: number
  stage: string
  shutoutEligible: boolean
  shutoutWinner: boolean
  groupStandings: GroupStandings | null
  rank: number
}

function normalizeTeamName(name: string): string {
  return name.toLowerCase()
    .replace(/é/g, 'e')
    .replace(/ô/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/['']/g, "'")
    .trim()
}

// ESPN's season.slug values map directly to our stage keys
const SLUG_TO_STAGE: Record<string, string> = {
  'round-of-32': 'round of 32',
  'round-of-16': 'round of 16',
  'quarterfinals': 'quarterfinal',
  'quarterfinal': 'quarterfinal',
  'semifinals': 'semifinal',
  'semifinal': 'semifinal',
  'final': 'final',
  '3rd-place-match': 'eliminated', // lost semis — out of main prize contention
}

const STAGE_RANK: Record<string, number> = {
  final: 6, semifinal: 5, quarterfinal: 4, 'round of 16': 3,
  'round of 32': 2, group: 1, eliminated: 0,
}

async function fetchESPNStandings(): Promise<GroupStandings[]> {
  try {
    const res = await fetch(ESPN_STANDINGS_URL, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) throw new Error(`ESPN standings ${res.status}`)
    const data = await res.json()

    const groups: GroupStandings[] = []
    const standingsGroups = data?.children ?? data?.standings?.groups ?? []

    for (const grp of standingsGroups) {
      const groupName: string = grp.name ?? grp.abbreviation ?? 'Unknown'
      const entries = grp.standings?.entries ?? grp.entries ?? []

      const teams: TeamStanding[] = entries.map((entry: any) => {
        const stats: any = {}
        for (const s of entry.stats ?? []) {
          stats[s.name] = s.value
          stats[s.abbreviation] = s.value
        }
        return {
          espnName: entry.team?.displayName ?? entry.team?.name ?? '',
          gamesPlayed: Number(stats['gamesPlayed'] ?? stats['GP'] ?? 0),
          wins: Number(stats['wins'] ?? stats['W'] ?? 0),
          draws: Number(stats['ties'] ?? stats['D'] ?? 0),
          losses: Number(stats['losses'] ?? stats['L'] ?? 0),
          goalsFor: Number(stats['pointsFor'] ?? stats['F'] ?? stats['GF'] ?? 0),
          goalsAgainst: Number(stats['pointsAgainst'] ?? stats['A'] ?? stats['GA'] ?? 0),
          points: Number(stats['points'] ?? stats['P'] ?? stats['PTS'] ?? 0),
          stage: 'group',
        }
      })

      groups.push({ group: groupName, teams })
    }

    return groups
  } catch (err) {
    console.error('ESPN standings fetch failed:', err)
    return []
  }
}

interface KnockoutStatus {
  stage: string
  eliminated: boolean
}

async function fetchKnockoutStatus(): Promise<Map<string, KnockoutStatus>> {
  const statusMap = new Map<string, KnockoutStatus>()

  try {
    const res = await fetch(ESPN_SCOREBOARD_URL, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) throw new Error(`ESPN scoreboard ${res.status}`)
    const data = await res.json()

    const events = data?.events ?? []

    for (const event of events) {
      const slug: string = event.season?.slug ?? ''
      const matchedStage = SLUG_TO_STAGE[slug]
      if (!matchedStage) continue // not a knockout round we track, or unrecognized slug

      const competition = event.competitions?.[0]
      if (!competition) continue

      const completed = competition.status?.type?.completed === true
      const competitors = competition.competitors ?? []

      for (const comp of competitors) {
        const teamName = comp.team?.displayName ?? comp.team?.name ?? ''
        const key = normalizeTeamName(teamName)

        // advance: true means they won and move to the next round
        // winner: false + completed means they lost this match
        const advanced = comp.advance === true
        const lost = completed && comp.winner === false

        const existing = statusMap.get(key)

        if (!existing || STAGE_RANK[matchedStage] >= STAGE_RANK[existing.stage]) {
          statusMap.set(key, {
            stage: matchedStage,
            eliminated: lost && !advanced,
          })
        }
      }
    }
  } catch (err) {
    console.error('ESPN scoreboard fetch failed:', err)
  }

  return statusMap
}

export async function GET() {
  const [groups, knockoutStatus] = await Promise.all([
    fetchESPNStandings(),
    fetchKnockoutStatus(),
  ])

  const teamLookup = new Map<string, { standing: TeamStanding; groupName: string }>()
  for (const g of groups) {
    for (const t of g.teams) {
      teamLookup.set(normalizeTeamName(t.espnName), { standing: t, groupName: g.group })
    }
  }

  const results: PoolResult[] = POOL.map((entry) => {
    const key = normalizeTeamName(entry.espnTeam)
    const match = teamLookup.get(key)
    const standing = match?.standing
    const knockout = knockoutStatus.get(key)

    const gamesPlayed = standing?.gamesPlayed ?? 0
    const goalsFor = standing?.goalsFor ?? 0
    const shutoutWinner = gamesPlayed >= 3 && goalsFor === 0
    const shutoutEligible = gamesPlayed > 0 && goalsFor === 0

    const groupStandings = match
      ? groups.find((g) => g.group === match.groupName) ?? null
      : null

    let stage = standing?.stage ?? 'group'
    if (knockout) {
      stage = knockout.eliminated ? 'eliminated' : knockout.stage
    }

    return {
      members: entry.members,
      team: entry.team,
      flag: entry.flag,
      bg: entry.bg,
      text: entry.text,
      border: entry.border,
      group: match?.groupName ?? entry.group,
      gamesPlayed,
      goalsFor,
      points: standing?.points ?? 0,
      wins: standing?.wins ?? 0,
      draws: standing?.draws ?? 0,
      losses: standing?.losses ?? 0,
      stage,
      shutoutEligible,
      shutoutWinner,
      groupStandings: groupStandings
        ? { group: groupStandings.group, teams: groupStandings.teams }
        : null,
      rank: 0,
    }
  })

  results.sort((a, b) => {
    const stageDiff = STAGE_RANK[b.stage] - STAGE_RANK[a.stage]
    if (stageDiff !== 0) return stageDiff
    const ptsDiff = b.points - a.points
    if (ptsDiff !== 0) return ptsDiff
    return b.goalsFor - a.goalsFor
  })

  let rank = 1
  let lastPoints = -1
  let lastStage = ''
  for (let i = 0; i < results.length; i++) {
    if (results[i].points !== lastPoints || results[i].stage !== lastStage) {
      rank = i + 1
    }
    results[i].rank = rank
    lastPoints = results[i].points
    lastStage = results[i].stage
  }

  return NextResponse.json({
    results,
    lastUpdated: new Date().toISOString(),
    groupCount: groups.length,
  })
}
