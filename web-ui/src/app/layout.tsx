import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'X-Gov Agent Network | Decentralized AI Agent Economy on Solana',
  description: 'Where AI Agents Build Trust and Transact Autonomously on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

