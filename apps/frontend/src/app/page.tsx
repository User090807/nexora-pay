const metrics = [
  { label: 'Available balance', value: 'R$ 128.420,18', delta: '+4.8%' },
  { label: 'Pending entries', value: 'R$ 31.680,50', delta: '+1.2%' },
  { label: 'Transactions', value: '1.246', delta: '+18.5%' },
  { label: 'Risk score', value: 'Low', delta: 'Stable' }
];

const actions = ['Send Pix', 'Cash in', 'Generate QR', 'Statements', 'Merchant', 'Security'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-shell-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-soft backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-300">NEXORA PAY</p>
            <h1 className="mt-1 text-xl font-semibold">Wallet Operations</h1>
          </div>
          <button className="rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 hover:bg-brand-500/20">
            Security mode ON
          </button>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-soft">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Financial control</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">NEXORA PAY</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Professional fintech infrastructure with merchant operations, wallet controls, risk oversight,
              auditability, and production-ready architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  key={action}
                  className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:border-brand-500/60 hover:text-brand-200"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Operational status</p>
              <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-2 py-1 text-xs font-medium text-brand-200">
                Healthy
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">API</p>
                <p className="mt-2 text-lg font-medium text-white">Online</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Database</p>
                <p className="mt-2 text-lg font-medium text-white">PostgreSQL connected</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Queue</p>
                <p className="mt-2 text-lg font-medium text-white">Redis active</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-soft">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <h3 className="text-2xl font-semibold text-white">{metric.value}</h3>
                <span className="text-xs font-medium text-brand-300">{metric.delta}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent activity</h3>
              <button className="text-sm text-brand-300">View all</button>
            </div>

            <div className="space-y-4">
              {[
                ['Incoming Pix', 'R$ 4.800,00', '14:32', 'Confirmed'],
                ['Merchant payout', 'R$ 12.450,00', '11:11', 'Processing'],
                ['Security alert', 'Session changed', '09:54', 'Reviewed'],
                ['Ledger correction', 'R$ 320,00', '08:17', 'Audit log']
              ].map(([name, value, time, status]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-sm text-slate-400">{time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{value}</p>
                    <p className="text-xs text-brand-200">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-white">Security center</h3>
            <div className="mt-6 space-y-5">
              {[
                ['MFA policy', 'Enabled'],
                ['Device trust', '7 devices'],
                ['Risk engine', 'Monitoring'],
                ['Audit log', '92 events']
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
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
