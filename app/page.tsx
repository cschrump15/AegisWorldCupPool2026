import StandingsTable from '@/components/StandingsTable'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-0 sm:px-4 py-6">
      {/* Header */}
      <div className="px-4 sm:px-0 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">⚽</span>
          <h1 className="text-2xl font-bold text-white">2026 World Cup Pool</h1>
        </div>
        <p className="text-sm text-gray-500 ml-12">
          Furthest team wins the main prize · Score zero goals in group play for the bonus
        </p>
      </div>

      {/* Main card */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden">
        <StandingsTable />
      </div>

      {/* Footer */}
      <div className="mt-4 px-4 sm:px-0 text-xs text-charcoal-500 text-center">
        Live data from ESPN · Tournament runs June 11 – July 19, 2026
      </div>
    </main>
  )
}
