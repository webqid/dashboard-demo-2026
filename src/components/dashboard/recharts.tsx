'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// Theme-aware colors
const BRAND_COLOR = '#2DD4BF';
const BRAND_MUTED = '#5EEAD4';
const CHART_COLORS = [
  '#2DD4BF', // brand
  '#818CF8', // indigo
  '#F472B6', // pink
  '#FBBF24', // amber
  '#34D399', // emerald
  '#60A5FA', // blue
];

interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface FormattedDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
  showArea?: boolean;
}

export function RechartsLineChart({ data, title, showArea = false }: LineChartProps) {
  const formattedData: FormattedDataPoint[] = data.map((d) => ({
    name: d.label,
    value: d.value,
    secondary: d.secondaryValue,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return [`$${value.toLocaleString()}`, ''];
    }
    return [String(value ?? ''), ''];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {showArea ? (
              <AreaChart data={formattedData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_MUTED} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_MUTED} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  className="text-text-muted"
                  axisLine={{ className: 'stroke-border' }}
                  tickLine={{ className: 'stroke-border' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-text-muted"
                  axisLine={{ className: 'stroke-border' }}
                  tickLine={{ className: 'stroke-border' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--wq-surface)',
                    border: '1px solid var(--wq-border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  labelStyle={{ color: 'var(--wq-text-primary)', fontWeight: 500 }}
                  itemStyle={{ color: 'var(--wq-text-secondary)' }}
                  formatter={formatValue}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={BRAND_COLOR}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  name="Revenue"
                />
                {formattedData[0]?.secondary !== undefined && (
                  <Area
                    type="monotone"
                    dataKey="secondary"
                    stroke={BRAND_MUTED}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSecondary)"
                    name="Expenses"
                  />
                )}
                <Legend />
              </AreaChart>
            ) : (
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  className="text-text-muted"
                  axisLine={{ className: 'stroke-border' }}
                  tickLine={{ className: 'stroke-border' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-text-muted"
                  axisLine={{ className: 'stroke-border' }}
                  tickLine={{ className: 'stroke-border' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--wq-surface)',
                    border: '1px solid var(--wq-border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  labelStyle={{ color: 'var(--wq-text-primary)', fontWeight: 500 }}
                  itemStyle={{ color: 'var(--wq-text-secondary)' }}
                  formatter={formatValue}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={BRAND_COLOR}
                  strokeWidth={2}
                  dot={{ fill: BRAND_COLOR, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: BRAND_COLOR }}
                  name="Revenue"
                />
                {formattedData[0]?.secondary !== undefined && (
                  <Line
                    type="monotone"
                    dataKey="secondary"
                    stroke={BRAND_MUTED}
                    strokeWidth={2}
                    dot={{ fill: BRAND_MUTED, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: BRAND_MUTED }}
                    name="Expenses"
                  />
                )}
                <Legend />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface BarChartProps {
  data: ChartDataPoint[];
  title: string;
}

export function RechartsBarChart({ data, title }: BarChartProps) {
  const formattedData: FormattedDataPoint[] = data.map((d) => ({
    name: d.label,
    value: d.value,
    secondary: d.secondaryValue,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return [`$${value.toLocaleString()}`, ''];
    }
    return [String(value ?? ''), ''];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                className="text-text-muted"
                axisLine={{ className: 'stroke-border' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-text-muted"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--wq-surface)',
                  border: '1px solid var(--wq-border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ color: 'var(--wq-text-primary)', fontWeight: 500 }}
                itemStyle={{ color: 'var(--wq-text-secondary)' }}
                formatter={formatValue}
                cursor={{ fill: 'var(--wq-surface-muted)', opacity: 0.5 }}
              />
              <Bar
                dataKey="value"
                fill={BRAND_COLOR}
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              {formattedData[0]?.secondary !== undefined && (
                <Bar
                  dataKey="secondary"
                  fill="var(--wq-border)"
                  radius={[4, 4, 0, 0]}
                  name="Expenses"
                />
              )}
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface PieChartData {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: PieChartData[];
  title: string;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ data, title, centerLabel, centerValue }: DonutChartProps) {
  // Format data for Recharts
  const chartData = data.map(item => ({ ...item }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--wq-surface)',
                  border: '1px solid var(--wq-border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ color: 'var(--wq-text-primary)', fontWeight: 500 }}
                itemStyle={{ color: 'var(--wq-text-secondary)' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-text-secondary">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center -mt-6">
                {centerValue && (
                  <p className="text-2xl font-semibold text-text-primary">{centerValue}</p>
                )}
                {centerLabel && (
                  <p className="text-xs text-text-muted">{centerLabel}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Monthly trend data for additional charts
export const monthlyTrendData: ChartDataPoint[] = [
  { label: 'Jan', value: 18500, secondaryValue: 12400 },
  { label: 'Feb', value: 22300, secondaryValue: 14200 },
  { label: 'Mar', value: 25100, secondaryValue: 15800 },
  { label: 'Apr', value: 23800, secondaryValue: 14900 },
  { label: 'May', value: 28400, secondaryValue: 17100 },
  { label: 'Jun', value: 31200, secondaryValue: 18500 },
];

export const projectStatusData: PieChartData[] = [
  { name: 'Active', value: 12 },
  { name: 'Completed', value: 8 },
  { name: 'Paused', value: 3 },
  { name: 'Archived', value: 2 },
];

export const trafficSourceData: PieChartData[] = [
  { name: 'Organic', value: 4500 },
  { name: 'Direct', value: 2800 },
  { name: 'Referral', value: 1900 },
  { name: 'Social', value: 1200 },
  { name: 'Paid', value: 800 },
];
