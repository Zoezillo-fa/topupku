export default function Section({ id, title, children, subtitle }){
  return (
    <section id={id} className="py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
