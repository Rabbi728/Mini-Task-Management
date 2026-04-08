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
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token) {
    const authUser = await useAuthStore.getState().fetchUser(token)
    
    if (!authUser || typeof authUser === 'boolean') {
      if (!isPublicRoute) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('token')
        return response
      }
    } else {
      const { role } = authUser;
      
      const adminOnlyRoutes = ['/tasks', '/users', '/activity-logs'];
      const userOnlyRoutes = ['/my-tasks'];

      const isAdminRoute = adminOnlyRoutes.some(route => pathname.startsWith(route));
      const isUserRoute = userOnlyRoutes.some(route => pathname.startsWith(route));

      if (role === 'user' && isAdminRoute) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      if (role === 'admin' && isUserRoute) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return NextResponse.next()
}