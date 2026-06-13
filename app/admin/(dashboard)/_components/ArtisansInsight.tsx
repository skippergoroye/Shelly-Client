import Link from "next/link";
import {
  CheckCircle2,
  Truck,
  AlertTriangle,
  AlertCircle,
  UserPlus,
  History,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    icon: CheckCircle2,
    iconColor: "text-green-500",
    iconBg: "bg-green-50 dark:bg-green-950/40",
    title: "New Provider Approved",
    description: "'Ocean Fresh Laundry' has completed verification and is now active.",
    time: "12 MINUTES AGO",
  },
  {
    id: 2,
    icon: Truck,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    title: "Bulk Dispatch Alert",
    description: "42 orders assigned to 'Express Riders' in Downtown District.",
    time: "45 MINUTES AGO",
  },
  {
    id: 3,
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50 dark:bg-yellow-950/40",
    title: "Delivery Delay Report",
    description: "Rider R-204 reports traffic delays. 5 deliveries affected.",
    time: "1 HOUR AGO",
  },
  {
    id: 4,
    icon: AlertCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50 dark:bg-red-950/40",
    title: "Payment Dispute Opened",
    description: "Customer C-8832 raised a refund request for Order #9912.",
    time: "3 HOURS AGO",
  },
  {
    id: 5,
    icon: UserPlus,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    title: "New Admin Logged In",
    description: "Sarah J. accessed the Settings panel from a new IP address.",
    time: "5 HOURS AGO",
  },
];

export function ArtisansInsight() {
  return (
    <Card className="border border-light-grey rounded-2xl p-6 flex flex-col gap-4 shadow-sm bg-white dark:bg-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
        <button className="text-sm font-medium text-primary hover:opacity-80 transition-opacity cursor-pointer">
          Clear
        </button>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {activities.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === activities.length - 1;
          return (
            <div key={item.id} className="flex gap-3">
              {/* Icon + vertical line */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-light-grey my-1 min-h-4" />
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-col gap-0.5 ${isLast ? "pb-0" : "pb-4"}`}>
                <p className="text-sm font-bold text-foreground leading-snug">
                  {item.title}
                </p>
                <p className="text-xs text-description leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-description/70 mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Link href="/admin/audit-logs" className="mt-auto pt-2">
        <Button
          variant="outline"
          className="w-full h-11 text-sm font-semibold border-light-grey rounded-xl text-foreground hover:bg-inner-background transition-colors cursor-pointer"
        >
          <History className="w-4 h-4 mr-2" />
          View Audit Logs
        </Button>
      </Link>
    </Card>
  );
}
