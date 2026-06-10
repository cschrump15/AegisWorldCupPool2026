'use client'

import { GroupStandings } from '@/app/api/standings/route'

interface Props {
  groupStandings: GroupStandings
  highlightTeam: string
  teamBg: string
  teamBorder: string
  teamText: string
}

export default function GroupDrilldown({ groupStandings, highlightTeam, teamBg, teamBorder, teamText }: Props) {
  const normalize = (s: string) => s.toLowerCase().trim()
  const hl = normalize(highlightTeam)

  const isMatch = (espnName: string) => {
    const n = normalize(espnName)
    return n.includes(hl) || hl.includes(n) || hl.split(' ').some(w => w.length > 3 && n.includes(w))
  }

  return (
    <div className="mx-3 my-2 rounded-lg overflow-hidden" style={{ border: `1px solid ${teamBorder}33` }}>
      {/* Group header */}
      <div
        className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
        style={{ background: `${teamBg}22`, color: teamBorder, borderBottom: `1px solid ${teamBorder}33` }}
      >
        {groupStandings.group}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-600 uppercase tracking-wider">
              <th className="text-left px-4 py-2 font-medium">Team</th>
              <th className="text-center px-2 py-2 font-medium w-8">GP</th>
              <th className="text-center px-2 py-2 font-medium w-8">W</th>
              <th className="text-center px-2 py-2 font-medium w-8">D</th>
              <th className="text-center px-2 py-2 font-medium w-8">L</th>
              <th className="text-center px-2 py-2 font-medium w-8">GF</th>
              <th className="text-center px-2 py-2 font-medium w-8">GA</th>
              <th className="text-center px-2 py-2 font-medium w-10">Pts</th>
            </tr>
          </thead>
          <tbody>
            {groupStandings.teams.map((team, i) => {
              const highlighted = isMatch(team.espnName)
              const advancing = i < 2

              return (
                <tr
                  key={team.espnName}
                  className="border-t border-zinc-800"
                  style={highlighted ? {
                    background: `${teamBg}18`,
                    borderLeft: `3px solid ${teamBorder}`,
                  } : {}}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs w-4 text-center font-mono ${
                        advancing ? 'text-green-500' : 'text-gray-600'
                      }`}>
                        {i + 1}
                      </span>
                      <span
                        className="text-sm"
                        style={highlighted ? { color: teamBorder, fontWeight: 600 } : { color: '#d1d5db' }}
                      >
                        {team.espnName}
                      </span>
                      {highlighted && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-bold"
                          style={{ background: teamBg, color: teamText, border: `1px solid ${teamBorder}` }}
                        >
                          pool
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-center px-2 py-2 text-gray-500 font-mono text-xs">{team.gamesPlayed}</td>
                  <td className="text-center px-2 py-2 text-gray-500 font-mono text-xs">{team.wins}</td>
                  <td className="text-center px-2 py-2 text-gray-500 font-mono text-xs">{team.draws}</td>
                  <td className="text-center px-2 py-2 text-gray-500 font-mono text-xs">{team.losses}</td>
                  <td className="text-center px-2 py-2 font-mono text-xs font-bold"
                    style={highlighted ? { color: teamBorder } : { color: '#9ca3af' }}>
                    {team.goalsFor}
                  </td>
                  <td className="text-center px-2 py-2 text-gray-500 font-mono text-xs">{team.goalsAgainst}</td>
                  <td className="text-center px-2 py-2 font-mono text-xs font-bold text-white">{team.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div
        className="px-4 py-1.5 flex items-center gap-3 text-xs text-gray-600"
        style={{ borderTop: `1px solid ${teamBorder}22` }}
      >
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500/60 inline-block" />
          Top 2 advance
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: teamBorder }} />
          Your pool team
        </span>
      </div>
    </div>
  )
}
