import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-medium tracking-tight text-text-primary">webqid.</span>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors duration-150">
              features
            </a>
            <a href="#about" className="hover:text-text-primary transition-colors duration-150">
              about
            </a>
            <Link href="/dashboard" className="hover:text-text-primary transition-colors duration-150">
              dashboard
            </Link>
          </nav>

          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} webqid.
          </p>
        </div>
      </div>
    </footer>
  );
}
