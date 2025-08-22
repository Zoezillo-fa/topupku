export default function GlowButton({ children, className='', ...props }){
  return <button {...props} className={`transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30 ${className}`}>{children}</button>
}
