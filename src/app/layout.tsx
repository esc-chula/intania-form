import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai, Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans-thai',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// TODO: Add your own metadata
export const metadata: Metadata = {
  title: 'Intania Form',
  description: 'Form wrapper for Chula Intania',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-svg-pattern min-h-screen font-sans antialiased',
          inter.variable,
          ibmPlexSansThai.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
