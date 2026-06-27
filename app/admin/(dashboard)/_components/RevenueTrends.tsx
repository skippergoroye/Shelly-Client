'use client';

import { Card } from '@/components/ui/card';
import { useGetRevenueChartQuery } from '@/redux/features/admin/dashboard/adminDashboardApi';

function buildPath(data: number[]): { stroke: string; fill: string } {
  const maxVal = Math.max(...data, 1);
  const W = 600;
  const H = 180;
  const n = data.length;

  const points = data.map((val, i) => ({
    x: (i / (n - 1)) * W,
    y: H - (val / maxVal) * (H - 10) + 5,
  }));

  let stroke = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    stroke += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const last = points[points.length - 1];
  const fill = `${stroke} L ${last.x} 200 L 0 200 Z`;

  return { stroke, fill };
}

export function RevenueTrends() {
  const { data } = useGetRevenueChartQuery();

  const chartData = data?.data ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels = data?.labels ?? [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const { stroke, fill } = buildPath(chartData);

  const xLabels = labels.filter((_, i) => i % 2 === 0);

  return (
    <Card className="lg:col-span-2 p-5 flex flex-col justify-between shadow-sm min-h-85">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800">Revenue Performance</h3>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
          {data?.year ?? new Date().getFullYear()}
        </div>
      </div>

      <div className="flex-1 w-full relative flex items-end min-h-50">
        <div className="absolute inset-x-0 top-1/4 border-b border-gray-100/60" />
        <div className="absolute inset-x-0 top-2/4 border-b border-gray-100/60" />
        <div className="absolute inset-x-0 top-3/4 border-b border-gray-100/60" />

        <svg
          viewBox="0 0 600 200"
          className="w-full h-full overflow-visible z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.00" />
            </linearGradient>
          </defs>
          <path d={fill} fill="url(#chart-fill)" />
          <path d={stroke} fill="none" stroke="#0066FF" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wide px-1">
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </Card>
  );
}
