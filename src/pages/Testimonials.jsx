import Section from '../components/Section.jsx'

export default function Testimonials(){
  return (
    <Section id="testi" title="Apa kata mereka?" subtitle="Ulasan pelanggan real, diambil dari simulasi (contoh).">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Rizky", text: "Murah & cepat. Diamonds langsung masuk!" },
          { name: "Alya", text: "Pembayaran QRIS gampang banget. Recommended." },
          { name: "Bima", text: "Customer support responsif, mantap." },
        ].map((t, i) => (
          <div key={i} className="rounded-2xl border p-4 bg-card">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full bg-muted grid place-items-center">{t.name[0]}</div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-yellow-500">★★★★★</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
