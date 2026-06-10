'use client'

import { GroupStandings } from '@/app/api/standings/route'

interface Props {
  groupStandings: GroupStandings
  highlightTeam: string // espn name of the pool team to highlight
}

export default function GroupDrilldown({ groupStandings, highlightTeam }: Props) {
  const normalize = (s: string) => s.toLowerCase().trim()

  return (
    <div className="bg-charcoal-700 border border-charcoal-600 rounded-lg mx-2 mb-2 overflow-hidden">
      <div className="px-4 py-2 border-b border-charcoal-600">
        <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
          {groupStandings.group}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-charcoal-500 uppercase tracking-wider">
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
              const isHighlighted = normalize(team.espnName).includes(normalize(highlightTeam)) ||
                normalize(highlightTeam).includes(normalize(team.espnName))
              const advancingSpot = i < 2 // top 2 advance (simplified; 3rd place rules differ)
              return (
                <tr
                  key={team.espnName}
                  className={`border-t border-charcoal-600 transition-colors ${
                    isHighlighted
                      ? 'bg-orange-500/10 border-l-2 border-l-orange-500'
                      : advancingSpot
                      ? 'bg-charcoal-800/40'
                      : ''
                  }`}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs w-4 text-center font-mono ${
                        advancingSpot ? 'text-green-400' : 'text-charcoal-500'
                      }`}>
                        {i + 1}
                      </span>
                      <span className={isHighlighted ? 'text-orange-300 font-semibold' : 'text-gray-300'}>
                        {team.espnName}
                      </span>
                      {isHighlighted && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-medium">
                          pool
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-center px-2 py-2 text-gray-400 font-mono text-xs">{team.gamesPlayed}</td>
                  <td className="text-center px-2 py-2 text-gray-400 font-mono text-xs">{team.wins}</td>
                  <td className="text-center px-2 py-2 text-gray-400 font-mono text-xs">{team.draws}</td>
                  <td className="text-center px-2 py-2 text-gray-400 font-mono text-xs">{team.losses}</td>
                  <td className={`text-center px-2 py-2 font-mono text-xs ${
                    isHighlighted ? 'text-orange-400 font-bold' : 'text-gray-400'
                  }`}>{team.goalsFor}</td>
                  <td className="text-center px-2 py-2 text-gray-400 font-mono text-xs">{team.goalsAgainst}</td>
                  <td className="text-center px-2 py-2 font-mono text-xs font-bold text-white">{team.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-1.5 border-t border-charcoal-600 flex items-center gap-3 text-xs text-charcoal-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400/60 inline-block" />
          Advancing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-400/60 inline-block" />
          Your pool team
        </span>
      </div>
    </div>
  )
}
