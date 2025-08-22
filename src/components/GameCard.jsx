import { motion } from 'framer-motion'
import { Smartphone, ChevronRight } from 'lucide-react'
import Badge from './Badge.jsx'

export default function GameCard({ game, onSelect }){
  return (
    <motion.button
      layout
      onClick={() => onSelect(game)}
      className="group rounded-2xl border p-4 text-left bg-card relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${game.color}`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{game.name}</div>
          <Badge>{game.tagline}</Badge>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Smartphone className="size-4" />
            <span>{game.requires.join(' • ')}</span>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-primary">
            <span>Lihat paket</span>
            <ChevronRight className="size-4" />
          </div>
        </div>
      </div>
    </motion.button>
  )
}
