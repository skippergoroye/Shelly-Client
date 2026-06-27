'use client';

import Link from 'next/link';
import { CreditCard, ShoppingBag, History } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetDashboardActivityQuery } from '@/redux/features/admin/dashboard/adminDashboardApi';

const TYPE_CONFIG = {
  payment: {
    icon: CreditCard,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50 dark:bg-green-950/40',
  },
  order: {
    icon: ShoppingBag,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
  },
};

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function ArtisansInsight() {
  const { data } = useGetDashboardActivityQuery();
  const activities = data?.activities ?? [];

  return (
    <Card className="border border-light-grey rounded-2xl p-6 flex flex-col gap-4 shadow-sm bg-white dark:bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
      </div>

      <div className="flex flex-col">
        {activities.map((item, index) => {
          const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.order;
          const Icon = config.icon;
          const isLast = index === activities.length - 1;
          return (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.iconBg}`}
                >
                  <Icon className={`w-4 h-4 ${config.iconColor}`} />
                </div>
                {!isLast && <div className="w-px flex-1 bg-light-grey my-1 min-h-4" />}
              </div>
              <div className={`flex flex-col gap-0.5 ${isLast ? 'pb-0' : 'pb-4'}`}>
                <p className="text-sm font-bold text-foreground leading-snug">{item.title}</p>
                <p className="text-xs text-description leading-relaxed">{item.description}</p>
                <p className="text-[10px] font-semibold tracking-wider text-description/70 mt-0.5 uppercase">
                  {timeAgo(item.time)}
                </p>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <p className="text-xs text-description text-center py-4">No recent activity.</p>
        )}
      </div>

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
