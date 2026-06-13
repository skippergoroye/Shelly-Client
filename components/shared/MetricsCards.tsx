import * as React from "react";
import { Card } from "@/components/ui/card";

export interface MetricsCardProps {
  icon: React.ReactNode;
  badgeText: string;
  badgeClassName?: string;
  iconContainerClassName?: string;
  title: string;
  value: string | number;
}

export function MetricsCard({
  icon,
  badgeText,
  badgeClassName = "bg-blue-50 text-blue-600",
  iconContainerClassName = "bg-gray-100/70 text-gray-500",
  title,
  value,
}: MetricsCardProps) {
  return (
    <Card className="p-5 flex flex-col justify-between shadow-sm min-h-31.25 bg-white border border-gray-200/60 rounded-xl">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconContainerClassName}`}>
          {icon}
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide ${badgeClassName}`}>
          {badgeText}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1 leading-none font-sans">
          {value}
        </h3>
      </div>
    </Card>
  );
}
