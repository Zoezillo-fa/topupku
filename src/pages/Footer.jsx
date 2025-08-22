import { Zap } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <Zap className="size-4 text-primary" /> TopUpKu
          </div>
          <p className="text-muted-foreground mt-2">Platform top up game digital. Bukan afiliasi resmi dengan publisher manapun.</p>
        </div>
        <div>
          <div className="font-medium">Navigasi</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li><a href="#games" className="hover:underline">Games</a></li>
            <li><a href="#why" className="hover:underline">Kenapa Kami</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Legal</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>Syarat & Ketentuan</li>
            <li>Kebijakan Privasi</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Kontak</div>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>WhatsApp: 08xx‑xxxx‑xxxx</li>
            <li>Email: support@topupku.id</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} TopUpKu. All rights reserved.</div>
    </footer>
  )
}
