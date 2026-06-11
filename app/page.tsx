import StandingsTable from '@/components/StandingsTable'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-0 sm:px-4 py-6">
      <div className="px-4 sm:px-0 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">⚽</span>
          <h1
            className="font-display font-bold tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 800, letterSpacing: '1px', color: '#fff' }}
          >
            2026 AEGIS WORLD CUP POOL
          </h1>
        </div>
        <p className="text-sm ml-12" style={{ color: '#fff' }}>
          Furthest team wins the main prize · Score zero goals in group play for the secondary prize
        </p>
      </div>

      <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden">
        <StandingsTable />
      </div>

      <div className="mt-4 px-4 sm:px-0 text-xs text-center" style={{ color: '#4a4a4a' }}>
        Live data from ESPN · Tournament runs June 11 – July 19, 2026
      </div>
    </main>
  )
}
