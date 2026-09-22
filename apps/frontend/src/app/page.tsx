'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const LOGIN_EMAIL = 'admin@nexora.pay';
const LOGIN_PASSWORD = 'Nexora@2026!Admin';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState(LOGIN_EMAIL);
  const [password, setPassword] = useState(LOGIN_PASSWORD);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (email.trim().toLowerCase() === LOGIN_EMAIL && password === LOGIN_PASSWORD) {
      localStorage.setItem('nexora-auth', JSON.stringify({ email, role: 'SUPER_ADMIN', loggedInAt: new Date().toISOString() }));
      router.push('/dashboard');
      return;
    }

    alert('Credenciais inválidas. Use admin@nexora.pay / Nexora@2026!Admin');
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#0e1217] text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-4 pb-8 pt-3">
        <header className="mb-4 flex items-center justify-between px-1.5 py-2">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d252f] text-lg text-[#dfe8ef] shadow-inner shadow-slate-700/40">
              🏠
            </span>
            <div className="font-medium tracking-tight text-slate-200">nexora-pay.vercel.app</div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sm">＋</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d252f] text-lg">◔</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d252f] text-lg">⋮</span>
          </div>
        </header>

        <section className="mb-4 mt-1 flex items-center justify-between rounded-2xl border border-slate-700/80 bg-[#181d24] px-3 py-3 shadow-[0_10px_34px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f2f4f6] text-xl text-[#121a22]">⚡</div>
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">NEXORA PAY</div>
              <div className="text-xl font-semibold tracking-tight text-slate-100">Nexora Pay</div>
            </div>
          </div>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#1b222b] text-xl text-slate-200">
            ☰
          </button>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[22px] border border-slate-700/80 bg-[#141a20] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">E-mail profissional <span className="text-red-400">*</span></label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="nome@empresa.com"
              className="w-full rounded-xl border border-[#2d7ef7] bg-[#11171d] px-4 py-3 text-base text-slate-50 outline-none placeholder:text-slate-500 focus:border-[#4a93ff]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Nome da empresa <span className="text-red-400">*</span></label>
            <input
              defaultValue="Sua empresa"
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-[#11171d] px-4 py-3 text-base text-slate-300 outline-none placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Site</label>
            <input
              defaultValue="https://empresa.com"
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-[#11171d] px-4 py-3 text-base text-slate-300 outline-none placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Tipo de negócio <span className="text-red-400">*</span></label>
            <div className="relative">
              <select defaultValue="" className="w-full appearance-none rounded-xl border border-slate-700 bg-[#11171d] px-4 py-3 pr-10 text-base text-slate-300 outline-none">
                <option value="" disabled>Selecione...</option>
                <option value="retail">Retail</option>
                <option value="saas">SaaS</option>
                <option value="fintech">Fintech</option>
                <option value="servicos">Serviços</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">⌄</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#101820] p-3 text-sm text-slate-300">
            <div className="mb-1 text-slate-200">O que você está tentando melhorar?</div>
            <div className="leading-6 text-slate-400">
              Taxas mais baixas, liquidação mais rápida, menos erros, recuperação de pagamentos...
            </div>
          </div>

          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Senha de acesso</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-xl border border-slate-700 bg-[#11171d] px-4 py-3 text-base text-slate-50 outline-none placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#f1f3f5] px-4 py-3 font-semibold text-[#12161b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Entrando...' : 'Acessar painel'}
          </button>
        </form>

        <div className="mt-5 rounded-2xl border border-slate-700 bg-[#121922] p-3 text-sm text-slate-400">
          <div className="flex items-center justify-between">
            <span>Login administrativo padrão</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              demo
            </span>
          </div>
          <div className="mt-2 text-slate-200">admin@nexora.pay</div>
          <div className="text-slate-400">Nexora@2026!Admin</div>
        </div>
      </div>
    </main>
  );
}
