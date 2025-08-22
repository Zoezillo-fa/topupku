import { Zap, Moon, Sun } from 'lucide-react'

export default function Header({ dark, setDark, tab, setTab, ordersCount }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-gradient-primary text-primary-foreground backdrop-blur transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-white/20 grid place-items-center text-white shadow">
            <Zap className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">TopUpKu</div>
            <div className="text-xs opacity-80">Cepat • Aman • Resmi</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <button onClick={() => setTab('home')} className={`px-3 py-1.5 rounded-lg hover:bg-white/20 ${tab==='home'?'bg-white/20':''}`}>Home</button>
          <button onClick={() => setTab('history')} className={`px-3 py-1.5 rounded-lg hover:bg-white/20 ${tab==='history'?'bg-white/20':''}`}>Riwayat <span className="ml-1 opacity-80">({ordersCount})</span></button>
          <button onClick={() => setTab('admin')} className={`px-3 py-1.5 rounded-lg hover:bg-white/20 ${tab==='admin'?'bg-white/20':''}`}>Admin</button>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm bg-white/20 hover:bg-white/30">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}<span className="hidden sm:inline">{dark ? 'Terang' : 'Gelap'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
