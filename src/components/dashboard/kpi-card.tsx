import type { KPI } from '@/types';
import { Card } from '@/components/ui';
import { IconTrendUp, IconTrendDown } from '@/components/icons';
import { formatCurrency, formatNumber, formatPercentage, calculatePercentageChange } from '@/lib/utils';

interface KPICardProps {
  kpi: KPI;
}

function formatValue(value: number, format: KPI['format']): string {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return formatPercentage(value);
    default:
      return formatNumber(value);
  }
}

export function KPICard({ kpi }: KPICardProps) {
  const percentageChange = calculatePercentageChange(kpi.value, kpi.previousValue);
  const isPositive = kpi.trend === 'up';

  return (
    <Card>
      <p className="text-xs text-text-muted uppercase tracking-wide">{kpi.label}</p>
      <p className="mt-2 text-2xl font-medium text-text-primary">
        {formatValue(kpi.value, kpi.format)}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        {isPositive ? (
          <IconTrendUp className="h-3.5 w-3.5 text-success" />
        ) : (
          <IconTrendDown className="h-3.5 w-3.5 text-text-muted" />
        )}
        <span
          className={`text-sm ${
            isPositive ? 'text-success' : 'text-text-muted'
          }`}
        >
          {percentageChange > 0 ? '+' : ''}
          {percentageChange.toFixed(1)}%
        </span>
        <span className="text-sm text-text-muted">vs last period</span>
      </div>
    </Card>
  );
}

interface KPIGridProps {
  kpis: KPI[];
}

export function KPIGrid({ kpis }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
