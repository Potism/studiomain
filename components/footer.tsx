export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-400 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Perspective Studio. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-[#C6FF3A] transition-colors">
            Privacy
          </a>
          <a href="#terms" className="hover:text-[#C6FF3A] transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
