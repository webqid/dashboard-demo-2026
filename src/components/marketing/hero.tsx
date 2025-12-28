import Link from 'next/link';
import { Button } from '@/components/ui';
import { IconArrowRight } from '@/components/icons';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-brand mb-6">
            precision over noise.
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight">
            frontend, built carefully.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-xl">
            a calm dashboard that brings clarity to your data. 
            precision-focused, understandable, quietly effective.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                open dashboard
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="ghost" size="lg">
                see features
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-20 sm:mt-24">
          <div className="rounded-lg border border-border bg-surface overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* KPI grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'revenue', value: '$284.5k', change: '+11%' },
                  { label: 'users', value: '12,847', change: '+14%' },
                  { label: 'conversion', value: '3.24%', change: '-0.6%' },
                  { label: 'avg. session', value: '4.2min', change: '+10%' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4"
                  >
                    <p className="text-xs text-text-muted uppercase tracking-wide">{stat.label}</p>
                    <p className="text-xl font-medium text-text-primary mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.change.startsWith('+')
                          ? 'text-success'
                          : 'text-text-muted'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
              {/* Chart placeholder */}
              <div className="border-t border-border pt-6">
                <div className="h-40 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 70, 50, 75, 60, 85, 55, 90].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-surface-muted rounded-sm transition-colors duration-150 hover:bg-brand"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
