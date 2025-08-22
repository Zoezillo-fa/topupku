import { useMemo, useState } from 'react'
import Section from '../components/Section.jsx'
import GlowButton from '../components/GlowButton.jsx'
import { Search } from 'lucide-react'

export default function AdminPage({ orders, onUpdateStatus, onClearAll }){
  const [q, setQ] = useState('')
  const filtered = useMemo(()=> orders.filter(o => [o.id, o.game, o.product].join(' ').toLowerCase().includes(q.toLowerCase())), [orders, q])
  return (
    <Section id="admin" title="Admin Sederhana" subtitle="Kelola status pesanan (demo, localStorage)">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 rounded-xl border px-3 py-2 bg-background">
          <Search className="size-4" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cari kode/game…" className="bg-transparent outline-none text-sm" />
        </div>
        <GlowButton onClick={onClearAll} className="rounded-xl border px-3 py-2 text-sm">Hapus Semua (Demo)</GlowButton>
      </div>
      <div className="grid gap-2">
        {filtered.map(o => (
          <div key={o.id} className="rounded-xl border p-3 bg-card flex flex-wrap items-center gap-3 justify-between">
            <div className="min-w-[220px]"><span className="font-mono text-sm">{o.id}</span><div className="text-xs text-muted-foreground">{o.game} • {o.product}</div></div>
            <div className="text-sm">{o.amount.toLocaleString('id-ID')}</div>
            <select value={o.status} onChange={(e)=>onUpdateStatus(o.id, e.target.value)} className="rounded-lg border bg-background px-2 py-1 text-sm">
              <option>Menunggu Pembayaran</option>
              <option>Sukses</option>
              <option>Gagal</option>
            </select>
          </div>
        ))}
        {filtered.length===0 && <div className="text-sm text-muted-foreground">Tidak ada data.</div>}
      </div>
    </Section>
  )
}
