import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

const COOKIE = 'nexora_admin_session';
function sign(value: string) { return createHmac('sha256', process.env.AUTH_SECRET || '').update(value).digest('hex'); }

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword || !process.env.AUTH_SECRET) return NextResponse.json({ error: 'Autenticação não configurada na Vercel.' }, { status: 503 });
  if (email !== configuredEmail || password !== configuredPassword) return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });

  const payload = Buffer.from(JSON.stringify({ email: configuredEmail, role: 'SUPER_ADMIN', exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 8 * 60 * 60, path: '/' });
  return response;
}

export async function GET(request: Request) {
  const raw = request.headers.get('cookie')?.split('; ').find((item) => item.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!raw) return NextResponse.json({ authenticated: false }, { status: 401 });
  const [payload, received] = raw.split('.');
  if (!payload || !received) return NextResponse.json({ authenticated: false }, { status: 401 });
  const expected = sign(payload);
  if (received.length !== expected.length || !timingSafeEqual(Buffer.from(received), Buffer.from(expected))) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp: number; email: string; role: string };
    if (session.exp < Date.now()) return NextResponse.json({ authenticated: false }, { status: 401 });
    return NextResponse.json({ authenticated: true, session });
  } catch { return NextResponse.json({ authenticated: false }, { status: 401 }); }
}
