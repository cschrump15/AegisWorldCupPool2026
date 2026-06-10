import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2026 World Cup Pool',
  description: 'Live standings for the 2026 World Cup office pool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-charcoal-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
