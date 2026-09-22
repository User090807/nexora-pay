'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Session = {
  email: string;
  role: string;
  loggedInAt: string;
};

const metrics = [
  { label: 'Saldo disponível', value: 'R$ 128.420,18', delta: '+4.8%' },
  { label: 'Entradas pendentes', value: 'R$ 31.680,50', delta: '+1.2%' },
  { label: 'Transações', value: '1.246', delta: '+18.5%' },
  { label: 'Score de risco', value: 'Baixo', delta: 'Estável' }
];

const activity = [
  ['Pix recebido', 'R$ 4.800,00', '14:32', 'Confirmado'],
  ['Pagamento de merchant', 'R$ 12.450,00', '11:11', 'Processando'],
  ['Alerta de segurança', 'Sessão alterada', '09:54', 'Revisado'],
  ['Correção de ledger', 'R$ 320,00', '08:17', 'Auditado']
];

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('nexora-auth');
    if (!raw) {
      router.push('/');
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Session;
      setSession(parsed);
    } catch {
      router.push('/');
    }
  }, [router]);

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0b1015] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-[#111922] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">NEXORA PAY</p>
            <h1 className="mt-1 text-xl font-semibold">Painel administrativo</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Segurança ativa
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('nexora-auth');
                router.push('/');
              }}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200"
            >
              Sair
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#111922] to-[#0d141a] p-8 shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Visão geral</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">NEXORA ADMIN</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Monitoramento financeiro, risco operacional, auditoria e segurança centralizados em uma única camada administrativa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {['Wallet', 'Merchant', 'Security', 'Reports', 'API'].map((item) => (
                <span key={item} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#111922] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Sessão ativa</p>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                online
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Usuário</p>
                <p className="mt-2 text-lg font-medium text-white">{session.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Perfil</p>
                <p className="mt-2 text-lg font-medium text-white">{session.role}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Último login</p>
                <p className="mt-2 text-lg font-medium text-white">{new Date(session.loggedInAt).toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-800 bg-[#111922] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <h3 className="text-2xl font-semibold text-white">{metric.value}</h3>
                <span className="text-xs font-medium text-emerald-300">{metric.delta}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-[#111922] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Atividade recente</h3>
              <button className="text-sm text-emerald-300">Ver tudo</button>
            </div>

            <div className="space-y-4">
              {activity.map(([name, value, time, status]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0d141a] p-4">
                  <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-sm text-slate-400">{time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{value}</p>
                    <p className="text-xs text-emerald-300">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-[#111922] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
            <h3 className="text-lg font-semibold text-white">Central de segurança</h3>
            <div className="mt-6 space-y-5">
              {[
                ['MFA', 'Ativado'],
                ['Dispositivos confiáveis', '7 ativos'],
                ['Motor de risco', 'Monitorando'],
                ['Audit log', '92 eventos']
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0d141a] p-3">
                  <span className="text-sm text-slate-300">{label}</span>
                  <span className="text-sm font-medium text-white">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
