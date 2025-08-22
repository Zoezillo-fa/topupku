import { ShieldCheck, Search, Wallet, Smartphone, CheckCircle2 } from 'lucide-react'

export default function Hero({ query, setQuery }){
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-background/60 backdrop-blur">
              <ShieldCheck className="size-4 text-primary" />
              <span>Harga bersaing • 24/7</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-gradient-primary">Top Up Game Instan & Terpercaya</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-[48ch]">
              Isi ulang Diamonds, UC, VP, dan item favorit kamu tanpa ribet. Bayar pakai QRIS/e‑Wallet/bank — masuk seketika.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Resmi</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Aman</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Cepat</li>
            </ul>
          </div>
          <div>
            <div className="rounded-2xl border shadow-sm p-3 sm:p-4 bg-card">
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2 bg-background">
                <Search className="size-4" />
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari game: Mobile Legends, FF, Genshin..." className="w-full bg-transparent outline-none text-sm" />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Wallet className="size-4" /> QRIS & e‑Wallet</div>
                <div className="flex items-center gap-2"><Smartphone className="size-4" /> Masuk Otomatis</div>
                <div className="flex items-center gap-2"><ShieldCheck className="size-4" /> Garansi 100%</div>
              </div>
              <div className="mt-4 rounded-xl bg-gradient-primary p-4 text-primary-foreground">
                <div className="text-sm font-medium mb-2">Cara cepat:</div>
                <ol className="grid grid-cols-3 gap-2 text-xs">
                  <li className="rounded-lg border border-white/20 p-2">1. Pilih game</li>
                  <li className="rounded-lg border border-white/20 p-2">2. Isi ID & nominal</li>
                  <li className="rounded-lg border border-white/20 p-2">3. Bayar & selesai</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
