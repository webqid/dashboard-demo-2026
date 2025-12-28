'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, ThemeToggle } from '@/components/ui';
import { IconMenu, IconClose } from '@/components/icons';

const navigation = [
  { name: 'features', href: '#features' },
  { name: 'about', href: '#about' },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8 h-14"
        aria-label="Global navigation"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-1.5 text-text-primary">
            <span className="text-[15px] font-medium tracking-tight">webqid</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-text-muted hover:text-text-primary transition-colors duration-150"
            aria-label="Open main menu"
          >
            <IconMenu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">open dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-text-primary/10 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-surface shadow-xl px-0 py-6">
            <div className="flex items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-1.5 text-text-primary">
                <span className="text-[15px] font-medium tracking-tight">webqid.</span>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2 rounded-md p-2 text-text-muted"
                  aria-label="Close menu"
                >
                  <IconClose className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-0.5 py-4 px-4 flow-root bg-surface shadow-sm">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-muted transition-colors duration-150"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Link
                    href="/dashboard"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" className="w-full">
                      sign in
                    </Button>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">open dashboard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
