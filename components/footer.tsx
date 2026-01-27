export function Footer() {
  return (
    <footer className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        {/* Monogram */}
        <div className="text-5xl md:text-6xl font-light tracking-widest mb-8">C & D</div>

        {/* Date */}
        <p className="text-lg tracking-[0.3em] uppercase mb-4">May 30, 2026</p>

        {/* Location */}
        <p className="text-sm tracking-widest text-primary-foreground/70">San Clemente, California</p>

        {/* Divider */}
        <div className="w-16 h-px bg-primary-foreground/30 mx-auto my-8" />
      </div>
    </footer>
  )
}
