import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { Hanken_Grotesk } from 'next/font/google'
import { SolanaWalletProvider } from '@/providers/WalletProvider'
import { Navigation } from '@/components/Navigation'
import { Metadata } from 'next'

const font = Hanken_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BXP - Build Experience',
  description: 'Web3-native, AI-powered proof of experience platform',
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SolanaWalletProvider>
      <Navigation />
      {children}
    </SolanaWalletProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${font.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
