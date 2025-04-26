import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const useWalletAuth = () => {
  const { connected, publicKey, disconnect } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (connected && publicKey) {
      // Store wallet address in cookie when connected
      Cookies.set('wallet_address', publicKey.toString(), {
        expires: 7, // Cookie expires in 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      })
    } else {
      // Remove wallet address from cookie when disconnected
      Cookies.remove('wallet_address')
    }
  }, [connected, publicKey])

  const handleDisconnect = async () => {
    await disconnect()
    Cookies.remove('wallet_address')
    router.push('/')
  }

  return {
    isConnected: connected,
    walletAddress: publicKey?.toString(),
    disconnect: handleDisconnect
  }
} 