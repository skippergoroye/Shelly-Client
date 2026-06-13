import { ClipboardList, Gauge, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OrderMetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconContainerClassName?: string;
  footer: React.ReactNode;
}

function OrderMetricCard({
  title,
  value,
  icon,
  iconContainerClassName = "bg-gray-100 text-gray-500",
  footer,
}: OrderMetricCardProps) {
  return (
    <Card className="p-5 flex flex-col justify-between shadow-sm min-h-32.5 bg-white border border-white rounded-xl">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconContainerClassName}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold text-gray-900 leading-none font-sans">
          {value}
        </h3>
        <div className="mt-2">{footer}</div>
      </div>
    </Card>
  );
}

export function OrderMetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <OrderMetricCard
        title="Pending Value"
        value="$14,280.00"
        icon={<ClipboardList className="w-5 h-5" />}
        iconContainerClassName="bg-gray-100 text-gray-500"
        footer={
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <TrendingUp className="w-3.5 h-3.5" />
            +12% from last week
          </span>
        }
      />

      <OrderMetricCard
        title="Active Shipments"
        value="32"
        icon={<Gauge className="w-5 h-5 text-primary" />}
        iconContainerClassName="bg-blue-50 text-primary"
        footer={
          <span className="text-xs text-gray-400 font-medium">
            Global distribution active
          </span>
        }
      />

      <OrderMetricCard
        title="Customer Satisfaction"
        value="98.4%"
        icon={<Sparkles className="w-5 h-5 text-primary" />}
        iconContainerClassName="bg-blue-50 text-primary"
        footer={
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: "98.4%" }}
            />
          </div>
        }
      />
    </div>
  );
}
