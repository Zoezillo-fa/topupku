import { useMemo, useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import GameCard from './components/GameCard.jsx'
import ProductModal from './components/ProductModal.jsx'
import { ModalOverlay } from './components/Modal.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import WhyUs from './pages/WhyUs.jsx'
import Testimonials from './pages/Testimonials.jsx'
import FAQ from './pages/FAQ.jsx'
import Footer from './pages/Footer.jsx'
import { GAMES } from './data/games.js'
import { loadOrders, saveOrders, addOrderToArray, updateOrderStatusInArray } from './utils/storage.js'

export default function App(){
  const [dark, setDark] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState('home')
  const [orders, setOrders] = useState([])

  useEffect(()=>{ setOrders(loadOrders()) }, [])
  useEffect(()=>{ saveOrders(orders) }, [orders])

  const filteredGames = useMemo(()=>{
    if (!query) return GAMES
    return GAMES.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const openGame = (g) => { setSelectedGame(g); setModalOpen(true) }
  const onOrderCreated = (order) => setOrders(prev => addOrderToArray(prev, order))
  const onUpdateStatus = (id, status) => setOrders(prev => updateOrderStatusInArray(prev, id, status))
  const onClearAll = () => { if (confirm('Hapus semua pesanan (demo)?')) setOrders([]) }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        <Header dark={dark} setDark={setDark} tab={tab} setTab={setTab} ordersCount={orders.length} />

        {tab === 'home' && (
          <>
            <Hero query={query} setQuery={setQuery} />
            <Section id="games" title="Pilih game kamu" subtitle="Klik salah satu untuk mulai top up.">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGames.map(g => <GameCard key={g.id} game={g} onSelect={openGame} />)}
              </div>
              {filteredGames.length === 0 && (<div className="text-sm text-muted-foreground mt-4">Tidak ditemukan. Coba nama game lain.</div>)}
            </Section>
            <WhyUs />
            <Testimonials />
            <FAQ />
          </>
        )}

        {tab === 'history' && <HistoryPage orders={orders} />}
        {tab === 'admin' && <AdminPage orders={orders} onUpdateStatus={onUpdateStatus} onClearAll={onClearAll} />}

        <Footer />

        {selectedGame && (
          <ProductModal open={modalOpen} onClose={()=>setModalOpen(false)} game={selectedGame} onOrderCreated={onOrderCreated} />
        )}
      </div>

      <ModalOverlay isVisible={modalOpen} />

      <style>{`
        :root{
          --background: 255 255 255;
          --foreground: 10 10 10;
          --muted: 245 245 245;
          --muted-foreground: 110 110 110;
          --card: 255 255 255;
          --primary: 59 130 246;
          --primary-foreground: 255 255 255;
          --gradient-start: 59 130 246;
          --gradient-end: 139 92 246;
        }
        .dark{
          --background: 20 24 34;
          --foreground: 244 244 245;
          --muted: 30 41 59;
          --muted-foreground: 148 163 184;
          --card: 23 31 49;
          --primary: 37 99 235;
          --primary-foreground: 255 255 255;
          --gradient-start: 37 99 235;
          --gradient-end: 124 58 237;
        }
        .bg-background{background-color: rgb(var(--background));}
        .text-foreground{color: rgb(var(--foreground));}
        .bg-card{background-color: rgb(var(--card));}
        .bg-muted{background-color: rgb(var(--muted));}
        .text-muted-foreground{color: rgb(var(--muted-foreground));}
        .bg-primary{background-color: rgb(var(--primary));}
        .text-primary{color: rgb(var(--primary));}
        .text-primary-foreground{color: rgb(var(--primary-foreground));}
        .border{border-color: rgb(255 255 255 / 0.08);} 
        .bg-gradient-primary{background-image: linear-gradient(to right, rgb(var(--gradient-start)), rgb(var(--gradient-end)));}
        .text-gradient-primary{background-image: linear-gradient(to right, rgb(var(--gradient-start)), rgb(var(--gradient-end))); -webkit-background-clip: text; color: transparent;}
        summary::-webkit-details-marker{display:none}
      `}</style>
    </div>
  )
}
