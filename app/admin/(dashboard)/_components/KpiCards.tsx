import { ShoppingBag, CreditCard, Truck, Box } from "lucide-react";
import { MetricsCard, type MetricsCardProps } from "@/components/shared/MetricsCards";

interface KpiCardsProps {
  items?: MetricsCardProps[];
}

const DEFAULT_ITEMS: MetricsCardProps[] = [
  {
    title: "Total Orders",
    value: "1,284",
    badgeText: "+12.5%",
    badgeClassName: "bg-red-50 text-red-600",
    icon: <ShoppingBag className="w-5 h-5" />,
    iconContainerClassName: "bg-blue-50 text-[#0066FF]",
  },
  {
    title: "Revenue",
    value: "₦42,600",
    badgeText: "+8.2%",
    badgeClassName: "bg-blue-50 text-blue-600",
    icon: <CreditCard className="w-5 h-5" />,
    iconContainerClassName: "bg-gray-100/70 text-gray-500",
  },
  {
    title: "Pending Deliveries",
    value: "14",
    badgeText: "Stable",
    badgeClassName: "bg-gray-100 text-gray-500",
    icon: <Truck className="w-5 h-5" />,
    iconContainerClassName: "bg-orange-50 text-orange-600",
  },
  {
    title: "Active Products",
    value: "52",
    badgeText: "Active",
    badgeClassName: "bg-blue-50 text-blue-600",
    icon: <Box className="w-5 h-5" />,
    iconContainerClassName: "bg-gray-100/70 text-gray-500",
  },
];

export function KpiCards({ items = DEFAULT_ITEMS }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((kpi, index) => (
        <MetricsCard
          key={index}
          title={kpi.title}
          value={kpi.value}
          badgeText={kpi.badgeText}
          badgeClassName={kpi.badgeClassName}
          icon={kpi.icon}
          iconContainerClassName={kpi.iconContainerClassName}
        />
      ))}
    </div>
  );
}
