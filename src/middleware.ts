import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

/**
 * BuyWise Route Protection Middleware
 * 
 * Protects routes based on user authentication and role:
 * - /dashboard/* → Authenticated users only
 * - /admin/*     → ADMIN role only
 * - /partner/*   → SERVICE_PROVIDER role only
 * - /api/admin/* → ADMIN role only
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes — no auth required
  const publicPrefixes = [
    '/', '/services', '/localities', '/pricing', '/properties',
    '/about', '/contact', '/careers', '/blog', '/trust',
    '/how-it-works', '/methodology', '/data-sources', '/legal',
    '/login', '/verification', '/api/auth',
  ];

  // Check if path matches a public route exactly or is a public prefix
  const isPublic = publicPrefixes.some(prefix => {
    if (prefix === '/') return pathname === '/';
    return pathname === prefix || pathname.startsWith(prefix + '/');
  });

  // Allow Next.js internal routes and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.svg')
  ) {
    return NextResponse.next();
  }

  if (isPublic) {
    return NextResponse.next();
  }

  // All other routes require authentication
  const session = await auth();

  if (!session?.user) {
    // Redirect unauthenticated users to login
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = (session.user as any).role || 'BUYER';

  // Admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }
  }

  // Partner routes
  if (pathname.startsWith('/partner')) {
    if (userRole !== 'SERVICE_PROVIDER' && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Partner access required' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image).*)',
  ],
};
