"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/shared/SubmitButton";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import DateFilter, { DateRange } from "@/components/common/DateFilter";

export type FilterValues = Record<string, string>;
export type FilterFieldType = "text" | "select";

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
  onApply: (values: FilterValues) => void;
  onReset: () => void;
  hasDateFilter?: boolean;
  dateFilterLabel?: string;
  dateRange?: DateRange;
  onDateChange?: (range: DateRange) => void;
  activeFilterCount?: number;
}

export const FilterSheet = ({
  open,
  onOpenChange,
  fields,
  onApply,
  onReset,
  hasDateFilter = false,
  dateFilterLabel = "Date Range",
  dateRange,
  onDateChange,
  activeFilterCount = 0,
}: FilterSheetProps) => {
  const defaultValues = fields.reduce<FilterValues>(
    (acc, f) => ({ ...acc, [f.key]: "" }),
    {},
  );

  const form = useForm<FilterValues>({ defaultValues });

  const handleApply = () => {
    onApply(form.getValues());
  };

  const handleReset = () => {
    form.reset(defaultValues);
    onReset();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-152 flex-col p-0 gap-0 bg-white border  border-white">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-light-grey">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-sm font-semibold text-foreground">
              Filters
            </SheetTitle>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
        </SheetHeader>

        {/* Fields */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {hasDateFilter && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground">
                {dateFilterLabel}
              </label>
              <DateFilter
                value={dateRange}
                onFilterChange={(range) => onDateChange?.(range)}
              />
            </div>
          )}

          {fields.map((field) =>
            field.type === "select" ? (
              <CustomFormField
                key={field.key}
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name={field.key}
                label={field.label}
                placeholder={field.placeholder ?? `All ${field.label}`}
                variant="h-[40px] w-full"
              >
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </CustomFormField>
            ) : (
              <CustomFormField
                key={field.key}
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={field.key}
                label={field.label}
                placeholder={
                  field.placeholder ?? `Enter ${field.label.toLowerCase()}`
                }
                variant="h-[40px] w-full bg-white"
              />
            ),
          )}
        </div>

        <SheetFooter className="px-6 py-4 border-t border-light-grey flex flex-row gap-2">
          <SubmitButton
            type="button"
            clickFn={handleReset}
            className="flex-1 h-9 text-xs font-semibold rounded-lg border border-light-grey bg-background text-foreground hover:bg-inner-background transition-colors shadow-none"
          >
            Reset
          </SubmitButton>
          <SubmitButton
            type="button"
            clickFn={handleApply}
            className="flex-1 h-9 text-xs font-semibold rounded-lg bg-primary text-white hover:opacity-90 transition-opacity shadow-none border-0"
          >
            Apply Filters
          </SubmitButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
