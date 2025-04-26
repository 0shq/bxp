import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Features that require wallet connection for full access
const WALLET_REQUIRED_FEATURES = {
  dashboard: {
    public: true,
    limitedAccess: true
  },
  ai: {
    public: true,
    limitedAccess: false // AI requires wallet for any interaction
  },
  feed: {
    public: true,
    limitedAccess: true
  },
  profile: {
    public: true,
    limitedAccess: true // Profiles are viewable but require wallet for editing
  }
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const walletAddress = request.cookies.get('wallet_address')?.value

  // Handle wallet address route
  if (pathname.match(/^\/[A-Za-z0-9]{32,44}$/)) {
    // If no wallet is connected, redirect to home
    if (!walletAddress) {
      const url = new URL('/', request.url)
      url.searchParams.set('error', 'wallet_required')
      return NextResponse.redirect(url)
    }
    
    // Add wallet connection status to headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-wallet-connected', 'true')
    requestHeaders.set('x-wallet-address', walletAddress)
    
    return NextResponse.next({
      headers: requestHeaders
    })
  }

  // For home route, always allow access but add wallet status to headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-wallet-connected', walletAddress ? 'true' : 'false')
  if (walletAddress) {
    requestHeaders.set('x-wallet-address', walletAddress)
  }

  return NextResponse.next({
    headers: requestHeaders
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 