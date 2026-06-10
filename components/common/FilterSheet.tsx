


import {  X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import SubmitButton from "@/components/shared/SubmitButton";





export type FilterValues = Record<string, string>;
export type FilterFieldType = "text" | "select" | "date";

export interface FilterField {
  key: string;
  label: string;
  type: FilterFieldType;
  options?: { label: string; value: string }[];
  placeholder?: string;
}





interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: FilterField[];
  values: FilterValues;
  onChange: (key: string, value: string) => void;
  onApply: () => void;
  onReset: () => void;
}



export const FilterSheet = ({
  open,
  onOpenChange,
  fields,
  values,
  onChange,
  onApply,
  onReset,
}: FilterSheetProps) => {
  const activeCount = Object.values(values).filter(Boolean).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-100 flex flex-col p-0 gap-0">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-light-grey">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-sm font-semibold text-foreground">
                Filters
              </SheetTitle>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
                  {activeCount}
                </span>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-inner-background text-description hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </SheetHeader>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 bg-dark-grey text-xs text-foreground border border-light-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                >
                  <option value="">
                    {field.placeholder ?? `All ${field.label}`}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "date" ? (
                <input
                  type="date"
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 bg-dark-grey text-xs text-foreground border border-light-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? ""}
                  placeholder={
                    field.placeholder ??
                    `Enter ${field.label.toLowerCase()}`
                  }
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 bg-dark-grey text-xs text-foreground placeholder:text-description border border-light-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t border-light-grey flex flex-row gap-2">
          <SubmitButton
            type="button"
            clickFn={onReset}
            className="flex-1 h-9 text-xs font-semibold rounded-lg border border-light-grey bg-background text-foreground hover:bg-inner-background transition-colors shadow-none"
          >
            Reset
          </SubmitButton>
          <SubmitButton
            type="button"
            clickFn={onApply}
            className="flex-1 h-9 text-xs font-semibold rounded-lg bg-primary text-white hover:opacity-90 transition-opacity shadow-none border-0"
          >
            Apply Filters
          </SubmitButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};