import './globals.css'
import type {Metadata} from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Animo',
  description: 'AI Powered Mood App',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-animo.png" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
