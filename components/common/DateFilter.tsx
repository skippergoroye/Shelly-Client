"use client";

import { useState, useRef, useEffect } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "../ui/button";
// import { Button } from "./Button";

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface DateFilterProps {
  value?: DateRange;
  onFilterChange: (dateRange: DateRange) => void;
}

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasAppliedFilter = !!value?.startDate && !!value?.endDate;

  const handleOpen = () => {
    setSelectionRange({
      startDate: value?.startDate ? new Date(value.startDate) : new Date(),
      endDate: value?.endDate ? new Date(value.endDate) : new Date(),
      key: "selection",
    });
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection.startDate && selection.endDate) {
      setSelectionRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: "selection",
      });
    }
  };

  const handleApply = () => {
    const dateRange: DateRange = {
      startDate: format(selectionRange.startDate, "yyyy-MM-dd"),
      endDate: format(selectionRange.endDate, "yyyy-MM-dd"),
    };
    onFilterChange(dateRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    onFilterChange({ startDate: null, endDate: null });
    setIsOpen(false);
  };

  const getButtonLabel = () => {
    if (hasAppliedFilter && value?.startDate && value?.endDate) {
      return `${format(new Date(value.startDate), "MMM d")} - ${format(new Date(value.endDate), "MMM d, yyyy")}`;
    }
    return "Select Date";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className={`rounded-lg border border-dark-grey bg-dark-grey px-5 outline-none h-12 w-full cursor-pointer flex items-center gap-3 text-sm font-medium ${
          hasAppliedFilter ? "border-primary text-primary" : ""
        }`}
      >
        {getButtonLabel()}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-dark-grey rounded-lg shadow-lg z-50 overflow-hidden">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            months={1}
            direction="vertical"
            moveRangeOnFirstSelection={false}
            rangeColors={["#0275d8"]}
          />

          <div className="flex justify-end gap-5 p-3 border-t border-dark-grey ml-auto">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleClear}
              className="w-fit!"
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleApply}
              className="w-fit!"
            >
              Apply Date Range
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
