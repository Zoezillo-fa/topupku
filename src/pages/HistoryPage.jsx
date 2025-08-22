import { useMemo, useState } from 'react'
import Section from '../components/Section.jsx'
import GlowButton from '../components/GlowButton.jsx'
import { Search } from 'lucide-react'
import { formatIDR } from '../utils/currency.js'

export default function HistoryPage({ orders }){
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const filtered = useMemo(()=>{
    return orders.filter(o => {
      const matchQ = [o.id, o.game, o.product, o.method].join(' ').toLowerCase().includes(q.toLowerCase())
      const matchS = status === 'all' ? true : o.status === status
      return matchQ && matchS
    })
  }, [orders, q, status])

  return (
    <Section id="history" title="Riwayat Pesanan" subtitle="Lihat dan cari pesanan kamu.">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-2 rounded-xl border px-3 py-2 bg-background">
          <Search className="size-4" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cari kode, game, metode…" className="bg-transparent outline-none text-sm" />
        </div>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-xl border bg-background px-3 py-2 text-sm">
          <option value="all">Semua Status</option>
          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
          <option value="Sukses">Sukses</option>
          <option value="Gagal">Gagal</option>
        </select>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2 pr-3">Kode</th>
              <th className="py-2 pr-3">Game</th>
              <th className="py-2 pr-3">Paket</th>
              <th className="py-2 pr-3">Metode</th>
              <th className="py-2 pr-3">Total</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Tanggal</th>
              <th className="py-2 pr-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t">
                <td className="py-2 pr-3 font-mono">{o.id}</td>
                <td className="py-2 pr-3">{o.game}</td>
                <td className="py-2 pr-3">{o.product}</td>
                <td className="py-2 pr-3">{o.method}</td>
                <td className="py-2 pr-3">{formatIDR(o.amount)}</td>
                <td className="py-2 pr-3">
                  <span className={`px-2 py-1 rounded-full text-xs border ${o.status==='Sukses'?'border-green-500/30 text-green-600 dark:text-green-300 bg-green-500/10': o.status==='Gagal'?'border-rose-500/30 text-rose-600 dark:text-rose-300 bg-rose-500/10':'border-yellow-500/30 text-yellow-700 dark:text-yellow-300 bg-yellow-500/10'}`}>{o.status}</span>
                </td>
                <td className="py-2 pr-3">{new Date(o.createdAt).toLocaleString('id-ID')}</td>
                <td className="py-2 pr-3">
                  <GlowButton onClick={()=>navigator.clipboard?.writeText(o.id)} className="rounded-lg border px-2 py-1 text-xs">Salin Kode</GlowButton>
                </td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr><td colSpan={8} className="py-6 text-center text-muted-foreground">Belum ada pesanan / tidak ada yang cocok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
