import type { ChartDataPoint } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface ChartProps {
  data: ChartDataPoint[];
  title: string;
}

export function BarChart({ data, title }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-44">
          {data.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1 h-36">
                {/* Secondary value bar */}
                {point.secondaryValue && (
                  <div
                    className="w-full max-w-6 bg-surface-muted rounded-sm transition-colors duration-150"
                    style={{
                      height: `${(point.secondaryValue / maxValue) * 100}%`,
                    }}
                  />
                )}
                {/* Primary value bar */}
                <div
                  className="w-full max-w-6 bg-border hover:bg-brand rounded-sm transition-colors duration-150"
                  style={{
                    height: `${(point.value / maxValue) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-text-muted">{point.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-border" />
            <span className="text-xs text-text-secondary">revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-surface-muted" />
            <span className="text-xs text-text-secondary">expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LineChart({ data, title }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  // Calculate SVG path
  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - ((point.value - minValue) / range) * 100,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-44 relative">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* Area fill */}
            <path
              d={`${pathD} L 100 100 L 0 100 Z`}
              fill="url(#gradient)"
              opacity="0.1"
            />
            {/* Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#2DD4BF"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex justify-between mt-2">
          {data.map((point, i) => (
            <span key={i} className="text-xs text-text-muted">
              {point.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
