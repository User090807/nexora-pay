import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const company = typeof body?.company === 'string' ? body.company.trim() : '';
  const website = typeof body?.website === 'string' ? body.website.trim() : '';
  const businessType = typeof body?.businessType === 'string' ? body.businessType.trim() : '';
  const improvement = typeof body?.improvement === 'string' ? body.improvement.trim() : '';

  if (!email || !company || !businessType) {
    return NextResponse.json({ error: 'Preencha e-mail, empresa e tipo de negócio.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.ONBOARDING_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !destination || !from) {
    return NextResponse.json({ error: 'Envio de e-mail não configurado na Vercel.' }, { status: 503 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [destination], reply_to: email, subject: `Novo cadastro NEXORA: ${company}`, html: `<h2>Novo cadastro de empresa</h2><p><b>E-mail:</b> ${email}</p><p><b>Empresa:</b> ${company}</p><p><b>Site:</b> ${website || 'Não informado'}</p><p><b>Tipo:</b> ${businessType}</p><p><b>Objetivo:</b> ${improvement || 'Não informado'}</p>` })
  });

  if (!response.ok) return NextResponse.json({ error: 'O provedor de e-mail recusou o envio.' }, { status: 502 });
  return NextResponse.json({ ok: true, message: 'Cadastro enviado com sucesso.' });
}
