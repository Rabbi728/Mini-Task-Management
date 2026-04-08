import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useAuthStore from './store/useAuthStore'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const token = request.cookies.get('token')?.value

  const isPublicRoute = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')

  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  console.log(pathname, token);
  if(token) {
    const authUser = await useAuthStore.getState().fetchUser(token)
    console.log(authUser, token);
    if(!authUser) {
        console.log('not');
        
    //   const response = NextResponse.redirect(new URL('/login', request.url))
    //   response.cookies.delete('token')
    //   return response
    }
    else if(authUser && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}