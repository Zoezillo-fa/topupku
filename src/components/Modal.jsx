import { AnimatePresence, motion } from 'framer-motion'

export function GlowModal({ children, className='' }){
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 30, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`w-full max-w-3xl rounded-2xl border bg-card p-4 sm:p-6 shadow-xl transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function ModalOverlay({ isVisible }){
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40"
        />
      )}
    </AnimatePresence>
  )
}
