import Section from '../components/Section.jsx'
import { HelpCircle } from 'lucide-react'

export default function FAQ(){
  const items = [
    { q: 'Berapa lama prosesnya?', a: 'Biasanya instan dalam hitungan detik setelah pembayaran terverifikasi.' },
    { q: 'Apa saja metode pembayaran yang didukung?', a: 'QRIS, e‑Wallet (DANA/OVO/GoPay/ShopeePay), dan Virtual Account bank (BCA/BRI).' },
    { q: 'Kalau ID salah?', a: 'Hubungi kami secepatnya. Jika item belum terkirim, kami bantu ubah/cek. Jika sudah terkirim ke ID salah, tidak dapat direfund.' },
    { q: 'Apakah ada bukti transaksi/invoice?', a: 'Setiap pesanan memiliki kode unik (mis. INV-2025-XXXXXX) yang bisa dicek di riwayat.' },
  ]
  return (
    <Section id="faq" title="Pertanyaan yang sering ditanyakan">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((f, i) => (
          <details key={i} className="rounded-2xl border p-4 bg-card group open:shadow-sm">
            <summary className="list-none cursor-pointer flex items-center justify-between">
              <div className="font-medium">{f.q}</div>
              <HelpCircle className="size-4 text-muted-foreground" />
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
