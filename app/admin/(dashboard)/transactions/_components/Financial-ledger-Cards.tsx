import { Wallet, TrendingUp, ClipboardList } from "lucide-react";
import { MetricsCard, type MetricsCardProps } from "@/components/shared/MetricsCards";

interface FinancialLedgerCardsProps {
  items?: MetricsCardProps[];
}

const DEFAULT_ITEMS: MetricsCardProps[] = [
  {
    title: "Total Revenue",
    value: "$482,904.00",
    badgeText: "+12.4%",
    badgeClassName: "bg-blue-50 text-blue-600",
    icon: <Wallet className="w-5 h-5" />,
    iconContainerClassName: "bg-blue-50 text-[#0066FF]",
  },
  {
    title: "This Month",
    value: "$52,440.00",
    badgeText: "+8.2%",
    badgeClassName: "bg-red-50 text-red-500",
    icon: <TrendingUp className="w-5 h-5" />,
    iconContainerClassName: "bg-orange-50 text-orange-500",
  },
  {
    title: "Pending",
    value: "$12,850.00",
    badgeText: "14 Active",
    badgeClassName: "bg-gray-100 text-gray-500",
    icon: <ClipboardList className="w-5 h-5" />,
    iconContainerClassName: "bg-gray-100/70 text-gray-500",
  },
];

export function FinancialLedgerCards({ items = DEFAULT_ITEMS }: FinancialLedgerCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {items.map((card, index) => (
        <MetricsCard
          key={index}
          title={card.title}
          value={card.value}
          badgeText={card.badgeText}
          badgeClassName={card.badgeClassName}
          icon={card.icon}
          iconContainerClassName={card.iconContainerClassName}
        />
      ))}
    </div>
  );
}
