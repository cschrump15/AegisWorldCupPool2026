'use client'

import { useState, useEffect, useCallback } from 'react'
import GroupDrilldown from './GroupDrilldown'
import { PoolResult } from '@/app/api/standings/route'

const STAGE_BADGE: Record<string, string> = {
  group: 'bg-charcoal-600 text-gray-400',
  'round of 32': 'bg-blue-900/50 text-blue-300',
  'round of 16': 'bg-blue-800/50 text-blue-200',
  quarterfinal: 'bg-purple-900/50 text-purple-300',
  semifinal: 'bg-amber-900/50 text-amber-300',
  final: 'bg-orange-900/50 text-orange-300',
  winner: 'bg-yellow-500/20 text-yellow-300',
  eliminated: 'bg-charcoal-700 text-charcoal-500',
}

const STAGE_DISPLAY: Record<string, string> = {
  group: 'Group Stage',
  'round of 32': 'Rd of 32',
  'round of 16': 'Rd of 16',
  quarterfinal: 'Quarterfinal',
  semifinal: 'Semifinal',
  final: 'Final',
  winner: '🏆 Champion',
  eliminated: 'Eliminated',
}

function formatLastUpdated(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function StandingsTable() {
  const [results, setResults] = useState<PoolResult[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'standings' | 'shutout'>('standings')

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/standings', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch standings')
      const data = await res.json()
      setResults(data.results)
      setLastUpdated(data.lastUpdated)
      setError(null)
    } catch (e) {
      setError('Could not load standings. Will retry.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  const shutoutCandidates = results.filter((r) => r.shutoutEligible && !r.shutoutWinner)
  const shutoutWinners = results.filter((r) => r.shutoutWinner)

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-3 text-charcoal-500">
          <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <span className="text-sm">Loading standings from ESPN…</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-700">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === 'standings'
                ? 'bg-orange-500 text-white'
                : 'text-charcoal-500 hover:text-gray-300'
            }`}
          >
            Standings
          </button>
          <button
            onClick={() => setActiveTab('shutout')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'shutout'
                ? 'bg-orange-500 text-white'
                : 'text-charcoal-500 hover:text-gray-300'
            }`}
          >
            Shutout prize
            {shutoutWinners.length > 0 && (
              <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {shutoutWinners.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-500">
          {error && <span className="text-red-400">{error}</span>}
          {lastUpdated && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </>
          )}
          <button
            onClick={fetchData}
            className="text-charcoal-500 hover:text-gray-300 transition-colors"
            title="Refresh"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Standings tab */}
      {activeTab === 'standings' && (
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-charcoal-500 uppercase tracking-wider border-b border-charcoal-700">
                <th className="text-left px-4 py-3 font-medium w-8">#</th>
                <th className="text-left px-2 py-3 font-medium">Team / Members</th>
                <th className="text-center px-2 py-3 font-medium w-10 hidden sm:table-cell">GP</th>
                <th className="text-center px-2 py-3 font-medium w-10 hidden sm:table-cell">GF</th>
                <th className="text-center px-2 py-3 font-medium w-10 hidden sm:table-cell">Pts</th>
                <th className="text-center px-2 py-3 font-medium">Stage</th>
                <th className="text-center px-2 py-3 font-medium w-8" />
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <>
                  <tr
                    key={`${r.team}-${idx}`}
                    onClick={() => r.groupStandings && toggleExpand(idx)}
                    className={`border-b border-charcoal-700/50 transition-colors ${
                      r.groupStandings ? 'cursor-pointer hover:bg-charcoal-700/40' : ''
                    } ${expandedIdx === idx ? 'bg-charcoal-700/40' : ''} ${
                      r.stage === 'eliminated' ? 'opacity-40' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className={`text-sm font-mono font-bold ${
                        r.rank === 1 ? 'text-yellow-400' : 'text-charcoal-500'
                      }`}>
                        {r.rank}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{r.flag}</span>
                        <div>
                          <div className="font-semibold text-white text-sm">{r.team}</div>
                          <div className="text-xs text-charcoal-500 leading-tight mt-0.5">{r.members}</div>
                        </div>
                        {r.shutoutEligible && !r.shutoutWinner && (
                          <span className="hidden sm:inline-flex text-xs bg-amber-900/30 text-amber-400 border border-amber-800/40 px-1.5 py-0.5 rounded ml-1">
                            0 goals 🔒
                          </span>
                        )}
                        {r.shutoutWinner && (
                          <span className="hidden sm:inline-flex text-xs bg-green-900/30 text-green-400 border border-green-800/40 px-1.5 py-0.5 rounded ml-1">
                            Shutout ✓
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-center px-2 py-3 text-gray-500 font-mono text-xs hidden sm:table-cell">
                      {r.gamesPlayed}
                    </td>
                    <td className={`text-center px-2 py-3 font-mono text-xs font-bold hidden sm:table-cell ${
                      r.goalsFor === 0 && r.gamesPlayed > 0 ? 'text-amber-400' : 'text-gray-400'
                    }`}>
                      {r.gamesPlayed > 0 ? r.goalsFor : '—'}
                    </td>
                    <td className="text-center px-2 py-3 font-mono text-xs font-bold text-white hidden sm:table-cell">
                      {r.gamesPlayed > 0 ? r.points : '—'}
                    </td>
                    <td className="text-center px-2 py-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${STAGE_BADGE[r.stage] ?? 'bg-charcoal-600 text-gray-400'}`}>
                        {STAGE_DISPLAY[r.stage] ?? r.stage}
                      </span>
                    </td>
                    <td className="text-center px-2 py-3">
                      {r.groupStandings && (
                        <span className={`text-charcoal-500 text-xs transition-transform inline-block ${
                          expandedIdx === idx ? 'rotate-180' : ''
                        }`}>
                          ▾
                        </span>
                      )}
                    </td>
                  </tr>
                  {expandedIdx === idx && r.groupStandings && (
                    <tr key={`${r.team}-drilldown`}>
                      <td colSpan={7} className="p-0">
                        <GroupDrilldown
                          groupStandings={r.groupStandings}
                          highlightTeam={r.team}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs text-charcoal-500 border-t border-charcoal-700">
            Tap any row to see full group standings · Refreshes every 5 minutes
          </div>
        </div>
      )}

      {/* Shutout tab */}
      {activeTab === 'shutout' && (
        <div className="p-4 space-y-4">
          {shutoutWinners.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
                ✓ Shutout prize winners
              </div>
              {shutoutWinners.map((r) => (
                <div key={r.team} className="flex items-center justify-between py-2.5 border-b border-charcoal-700">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{r.flag}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{r.team}</div>
                      <div className="text-xs text-charcoal-500">{r.members}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-green-900/40 text-green-400 border border-green-800/40 px-2 py-1 rounded">
                    0 goals in group play ✓
                  </span>
                </div>
              ))}
            </div>
          )}
          {shutoutCandidates.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                Still in contention (0 goals so far)
              </div>
              {shutoutCandidates.map((r) => (
                <div key={r.team} className="flex items-center justify-between py-2.5 border-b border-charcoal-700/50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{r.flag}</span>
                    <div>
                      <div className="font-semibold text-gray-300 text-sm">{r.team}</div>
                      <div className="text-xs text-charcoal-500">{r.members}</div>
                    </div>
                  </div>
                  <span className="text-xs text-amber-500">{r.gamesPlayed}/3 played</span>
                </div>
              ))}
            </div>
          )}
          {shutoutWinners.length === 0 && shutoutCandidates.length === 0 && (
            <p className="text-charcoal-500 text-sm text-center py-8">
              Group stage hasn't started yet — check back once games are played.
            </p>
          )}
          <p className="text-xs text-charcoal-500 pt-2">
            Bonus prize: your team finishes group play without scoring a single goal.
            Must complete all 3 group stage matches.
          </p>
        </div>
      )}
    </div>
  )
}
