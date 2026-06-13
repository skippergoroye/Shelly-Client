import { Card } from "@/components/ui/card";

export function RevenueTrends() {
  return (
    <Card className="lg:col-span-2 p-5 flex flex-col justify-between shadow-sm min-h-85">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800">
          Revenue Performance
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
          This Year
        </div>
      </div>

      {/* SVG Custom Curved Chart */}
      <div className="flex-1 w-full relative flex items-end min-h-50">
        {/* Grid Line Marks */}
        <div className="absolute inset-x-0 top-1/4 border-b border-gray-100/60" />
        <div className="absolute inset-x-0 top-2/4 border-b border-gray-100/60" />
        <div className="absolute inset-x-0 top-3/4 border-b border-gray-100/60" />

        {/* Custom SVG Drawing */}
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

          {/* Area Under Curve */}
          <path
            d="M 0 160 C 90 145, 150 120, 220 105 C 290 90, 320 75, 360 75 C 410 75, 440 145, 490 140 C 530 135, 570 95, 600 75 L 600 200 L 0 200 Z"
            fill="url(#chart-fill)"
          />

          {/* Curve Stroke Line */}
          <path
            d="M 0 160 C 90 145, 150 120, 220 105 C 290 90, 320 75, 360 75 C 410 75, 440 145, 490 140 C 530 135, 570 95, 600 75"
            fill="none"
            stroke="#0066FF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* X-Axis Month Labels */}
      <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wide px-1">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </Card>
  );
}
