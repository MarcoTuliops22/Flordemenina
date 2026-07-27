import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Token bucket in-memory rate limiter for serverless edge
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 30; // 30 req/min por IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip);

  if (!userRecord || now - userRecord.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userRecord.count += 1;
  return true;
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || '127.0.0.1';

  // Apply Rate Limiting on sensitive API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const isAllowed = checkRateLimit(ip);
    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Muitas requisições enviadas. Limite de taxa excedido por segurança (OWASP Rate Limiting).',
          code: 'TOO_MANY_REQUESTS',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // --- OWASP Security Headers ---
  
  // 1. Protection against Clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // 2. Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 3. Strict Transport Security (HSTS - 1 year)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // 4. Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 5. Permissions Policy (Disables unwanted hardware APIs)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(self)'
  );

  // 6. Content Security Policy (CSP)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://viacep.com.br;
    frame-ancestors 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
