import Section from '../components/Section.jsx'
import { Zap, ShieldCheck, Wallet, Star } from 'lucide-react'

export default function WhyUs(){
  return (
    <Section id="why" title="Kenapa pilih TopUpKu?" subtitle="Dibuat untuk kecepatan & kepercayaan.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ icon: <Zap className="size-5" />, title: "Instan", desc: "Item masuk otomatis setelah pembayaran." },
          { icon: <ShieldCheck className="size-5" />, title: "Aman", desc: "Transaksi terenkripsi & garansi 100%." },
          { icon: <Wallet className="size-5" />, title: "Banyak Metode", desc: "QRIS, e‑Wallet, & VA Bank." },
          { icon: <Star className="size-5" />, title: "Harga Bersaing", desc: "Tanpa biaya tersembunyi." }].map((f, idx) => (
          <div key={idx} className="rounded-2xl border p-4 bg-card">
            <div className="size-10 grid place-items-center rounded-xl bg-primary/10 text-primary">{f.icon}</div>
            <div className="mt-3 font-medium">{f.title}</div>
            <div className="text-sm text-muted-foreground">{f.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
