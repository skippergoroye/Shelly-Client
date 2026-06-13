import { Check, Copy } from 'lucide-react';
import { useState } from 'react'
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OverviewField {
  label: string;
  value: ReactNode;
}

interface OrderOverViewProps {
  title: string;
  fields: OverviewField[];
  copyText: string;
}


const OrderOverView = ({ title, fields, copyText }: OrderOverViewProps) => {
      const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
      <div>
      <div className="px-6 py-4 border-b border-light-grey flex items-center justify-between">
        <h2 className="text-base font-bold">{title}</h2>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer",
            copied
              ? "bg-green-50 border-green-300 text-green-700"
              : "bg-background border-light-grey text-description hover:text-foreground hover:border-gray-400"
          )}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 p-6">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-description">
              {field.label}
            </span>
            <span className="text-sm font-semibold text-foreground wrap-break-word">
              {field.value || "---"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderOverView

