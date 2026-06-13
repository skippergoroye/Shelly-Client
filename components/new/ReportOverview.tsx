import { ReactNode } from "react";
import { formatAmount } from "@/app/lib/utils";

export interface OverviewField {
  label: string;
  value: ReactNode;
}

interface ReportOverviewProps {
  title: string;
  fields: OverviewField[];
}

const ReportOverview = ({ title, fields }: ReportOverviewProps) => {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-background border border-light-grey">
      <div className="px-6 py-4 border-b border-light-grey">
        <h2 className="text-base font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 p-6 pt-2">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-description">
              {field.label}
            </span>
            <span className="text-sm font-semibold text-foreground wrap-break-word">
              {typeof field.value === "number"
                ? formatAmount(field.value)
                : (field.value || "---")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportOverview;
