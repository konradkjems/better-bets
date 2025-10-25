import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '../components/ui/Header'
import { Footer } from '../components/ui/Footer'
import { PWAProvider } from '../components/pwa/PWAProvider'
import { PerformanceMonitor } from '../components/performance/PerformanceMonitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Better Bets - Arbitrage Calculator',
  description: 'Calculate optimal bet distributions across bookmakers for guaranteed profits',
  keywords: ['arbitrage', 'betting', 'calculator', 'sports betting', 'profit'],
  authors: [{ name: 'Better Bets Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Better Bets',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Better Bets',
    title: 'Better Bets - Arbitrage Calculator',
    description: 'Calculate optimal bet distributions across bookmakers for guaranteed profits',
  },
  twitter: {
    card: 'summary',
    title: 'Better Bets - Arbitrage Calculator',
    description: 'Calculate optimal bet distributions across bookmakers for guaranteed profits',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Better Bets" />
          <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className={inter.className}>
          <PWAProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <PerformanceMonitor />
            </div>
          </PWAProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
