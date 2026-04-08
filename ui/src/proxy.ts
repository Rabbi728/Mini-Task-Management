import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useAuthStore from './store/useAuthStore'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const token = request.cookies.get('token')?.value
  let user = useAuthStore.getState().user

  const isPublicRoute = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')

  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if(token && !user.name) {
    const authUser = await useAuthStore.getState().fetchUser(token)
    if(!authUser) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
