import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ArtisansInsight() {
  return (
    <Card className="bg-[#004bdc] border-0 rounded-xl p-6 flex flex-col justify-between text-white shadow-sm min-h-[340px] relative overflow-hidden">
      {/* Sparkles Background Blur */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-6">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
          <Sparkles className="w-5.5 h-5.5 text-white" />
        </div>
        <div className="space-y-3">
          <h3 className="text-base font-bold tracking-wide">
            Artisan's Insight
          </h3>
          <p className="text-xs leading-relaxed text-blue-100 font-medium">
            Highest demand noted for bespoke oxfords this quarter.
            Recommendation: Restock premium calfskin leather.
          </p>
        </div>
      </div>

      <Link
        href="/admin/analytics"
        className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-blue-100 transition-colors mt-8 group w-fit cursor-pointer"
      >
        View Analytics
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Card>
  );
}
