import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Smartphone, Search, Wallet, ShoppingCart, X, CheckCircle2, History, Copy } from 'lucide-react'
import GlowButton from './GlowButton.jsx'
import { GlowModal } from './Modal.jsx'
import { calculateTotal } from '../utils/calc.js'
import { formatIDR } from '../utils/currency.js'
import { generateInvoice } from '../utils/invoice.js'
import { rand } from '../utils/calc.js'
import { PAYMENT_METHODS } from '../data/paymentMethods.js'

export default function ProductModal({ open, onClose, game, onOrderCreated }){
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [fields, setFields] = useState({})
  const [method, setMethod] = useState(PAYMENT_METHODS[0])
  const [processing, setProcessing] = useState(false)
  const [order, setOrder] = useState(null)

  const products = useMemo(()=>{
    const list = game?.products || []
    if (!search) return list
    return list.filter(p => p.label.toLowerCase().includes(search.toLowerCase()))
  }, [search, game])

  const total = useMemo(()=>{
    if (!selectedProduct || !method) return 0
    return calculateTotal(selectedProduct.price, method.fee)
  }, [selectedProduct, method])

  const canPay = useMemo(()=>{
    if (!game || !selectedProduct || !method) return false
    return game.requires.every(r => (fields[r] || '').trim().length > 0)
  }, [game, selectedProduct, method, fields])

  const createOrder = async () => {
    setProcessing(true)
    await new Promise(r => setTimeout(r, 500))
    const code = generateInvoice('INV')
    const _order = {
      id: code,
      game: game.name,
      product: selectedProduct.label,
      amount: total,
      method: method.name,
      status: 'Menunggu Pembayaran',
      va: method.type.includes('bank') ? `8989${rand(1000000000, 1999999999)}` : undefined,
      createdAt: new Date().toISOString(),
      fields,
    }
    setOrder(_order)
    onOrderCreated && onOrderCreated(_order)
    setProcessing(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center px-4">
          <GlowModal>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Top Up • {game?.name}</div>
                <h3 className="text-xl font-semibold tracking-tight">Pilih nominal & bayar</h3>
              </div>
              <button onClick={onClose} className="rounded-xl border p-2 hover:bg-muted">
                <X className="size-4" />
              </button>
            </div>

            {!order && (
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium mb-2">Data Player</div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {game?.requires.map((r) => (
                        <div key={r} className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-background">
                          <Smartphone className="size-4" />
                          <input value={fields[r] || ''} onChange={(e)=>setFields(f=>({...f,[r]:e.target.value}))} placeholder={r} className="w-full bg-transparent outline-none text-sm" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">Pastikan ID benar. Item akan masuk otomatis setelah pembayaran sukses.</p>
                  </div>

                  <div className="rounded-xl border p-3 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Pilih Nominal</div>
                      <div className="flex items-center gap-2 rounded-lg border px-2 py-1 text-xs">
                        <Search className="size-3" />
                        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Cari paket…" className="bg-transparent outline-none" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {products.map((p) => (
                        <button key={p.id} onClick={()=>setSelectedProduct(p)} className={`rounded-lg border p-3 text-left hover:bg-muted ${selectedProduct?.id===p.id?'ring-2 ring-primary':''}`}>
                          <div className="text-sm font-medium">{p.label}</div>
                          <div className="text-xs text-muted-foreground">{formatIDR(p.price)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium mb-2">Metode Pembayaran</div>
                    <div className="grid gap-2">
                      {PAYMENT_METHODS.map((m)=>(
                        <label key={m.id} className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer hover:bg-muted ${method.id===m.id?'ring-1 ring-primary':''}`}>
                          <input type="radio" name="pay" checked={method.id===m.id} onChange={()=>setMethod(m)} />
                          <Wallet className="size-4" />
                          <div className="text-sm">{m.name}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border p-3 mt-3">
                    <div className="text-sm font-medium mb-2">Ringkasan</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span>Produk</span><span>{selectedProduct ? selectedProduct.label : '-'}</span></div>
                      <div className="flex justify-between"><span>Harga</span><span>{selectedProduct ? formatIDR(selectedProduct.price) : '-'}</span></div>
                      <div className="flex justify-between"><span>Biaya</span><span>{selectedProduct ? formatIDR(total - selectedProduct.price) : '-'}</span></div>
                      <div className="border-t my-2" />
                      <div className="flex justify-between font-semibold"><span>Total</span><span>{selectedProduct ? formatIDR(total) : '-'}</span></div>
                    </div>
                    <GlowButton disabled={!canPay || processing} onClick={createOrder} className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50">
                      <ShoppingCart className="size-4" />
                      {processing ? 'Memproses…' : 'Bayar Sekarang'}
                    </GlowButton>
                    <p className="text-[11px] text-muted-foreground mt-2">Dengan menekan bayar, Anda menyetujui S&K yang berlaku.</p>
                  </div>
                </div>
              </div>
            )}

            {order && (
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="rounded-xl border p-3">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="size-5" />
                      <div className="font-medium">Pesanan dibuat</div>
                    </div>
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
                      <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">Kode</div><div className="font-mono">{order.id}</div></div>
                      <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">Game</div><div>{order.game}</div></div>
                      <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">Paket</div><div>{order.product}</div></div>
                      <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">Metode</div><div>{order.method}</div></div>
                      {order.va && <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">No. VA</div><div className="font-mono">{order.va}</div></div>}
                      <div className="rounded-lg border p-2"><div className="text-muted-foreground text-xs">Total</div><div className="font-semibold">{formatIDR(order.amount)}</div></div>
                    </div>
                    <div className="mt-3 rounded-lg border p-3 bg-muted/30 text-sm">
                      Selesaikan pembayaran sesuai metode yang dipilih. Pesanan akan diproses otomatis & item dikirim ke akun kamu.
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium mb-2">Status</div>
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border border-yellow-500/20">
                      <History className="size-4" /> {order.status}
                    </div>
                    <button onClick={() => setOrder((o) => ({ ...o, status: 'Sukses' }))} className="mt-3 w-full rounded-xl border px-3 py-2 text-sm hover:bg-muted">Simulasikan Sukses</button>
                    <button onClick={() => setOrder((o) => ({ ...o, status: 'Gagal' }))} className="mt-2 w-full rounded-xl border px-3 py-2 text-sm hover:bg-muted">Simulasikan Gagal</button>
                    <GlowButton onClick={() => navigator.clipboard?.writeText(order.id)} className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90">
                      <Copy className="size-4" /> Salin Kode Pesanan
                    </GlowButton>
                  </div>
                </div>
              </div>
            )}
          </GlowModal>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
