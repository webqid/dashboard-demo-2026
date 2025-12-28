import {
  IconZap,
  IconShield,
  IconGlobe,
  IconBarChart,
  IconUsers,
  IconActivity,
} from '@/components/icons';

const features = [
  {
    name: 'real-time analytics',
    description:
      'monitor metrics as they happen. no delays, no batch processing.',
    icon: IconBarChart,
  },
  {
    name: 'performance-first',
    description:
      'sub-100ms response times. edge-first architecture.',
    icon: IconZap,
  },
  {
    name: 'secure by default',
    description:
      'end-to-end encryption. role-based access control.',
    icon: IconShield,
  },
  {
    name: 'global infrastructure',
    description:
      'deployed across 30+ regions. data stays close to users.',
    icon: IconGlobe,
  },
  {
    name: 'team collaboration',
    description:
      'share dashboards, set alerts, work together in real-time.',
    icon: IconUsers,
  },
  {
    name: 'activity monitoring',
    description:
      'full audit trail for compliance and debugging.',
    icon: IconActivity,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm text-brand mb-4">capabilities</p>
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            clarity at scale.
          </h2>
          <p className="mt-4 text-text-secondary">
            no bloat. no unnecessary complexity. just what you need.
          </p>
        </div>

        <div className="mt-16">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group border border-border rounded-lg p-6 hover:bg-surface-muted transition-colors duration-150"
              >
                <dt>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-muted text-text-secondary group-hover:bg-brand-soft/30 group-hover:text-brand transition-colors duration-150">
                    <feature.icon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-text-primary">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
