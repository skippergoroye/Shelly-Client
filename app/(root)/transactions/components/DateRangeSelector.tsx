import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import moment from "moment";
import { DateRangeT } from "../types";
import { DATE_RANGE_PRESETS } from "../hooks/useTransactionFilters";

interface DateRangeSelectorProps {
    dateRange: DateRangeT;
    onDateRangeChange: (range: DateRangeT) => void;
    onPresetSelect: (preset: () => DateRangeT) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
    dateRange,
    onDateRangeChange,
    onPresetSelect,
}) => {
    const [showCustom, setShowCustom] = useState(false);

    const getLabel = (): string => {
        if (!dateRange.startDate && !dateRange.endDate) return "Date Range";
        const preset = DATE_RANGE_PRESETS.find((p) => {
            const val = p.value();
            return val.startDate === dateRange.startDate && val.endDate === dateRange.endDate;
        });
        if (preset) return preset.label;
        return `${dateRange.startDate} - ${dateRange.endDate}`;
    };

    const handleDateSelect = (range: DateRange | undefined) => {
        onDateRangeChange({
            startDate: range?.from ? moment(range.from).format("YYYY-MM-DD") : "",
            endDate: range?.to ? moment(range.to).format("YYYY-MM-DD") : "",
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className=" gap-2 border-gray-200 text-primary">
                    {getLabel()}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
                <div className="flex gap-2 flex-wrap mb-3">
                    {DATE_RANGE_PRESETS.map((preset, index) => (
                        <Button
                            key={`preset-${index}`}
                            variant={
                                dateRange.startDate === preset.value().startDate &&
                                    dateRange.endDate === preset.value().endDate
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            className="rounded-full px-4"
                            onClick={() => {
                                onPresetSelect(preset.value);
                                setShowCustom(false);
                            }}
                        >
                            {preset.label}
                        </Button>
                    ))}
                    <Button
                        variant={showCustom ? "default" : "outline"}
                        size="sm"
                        className="rounded-full px-4"
                        onClick={() => setShowCustom(!showCustom)}
                    >
                        Custom
                    </Button>
                </div>
                {showCustom && (
                    <Calendar
                        initialFocus
                        className="p-3 font-averta"
                        disabled={{ after: new Date() }}
                        mode="range"
                        numberOfMonths={2}
                        selected={{
                            from: dateRange.startDate ? new Date(dateRange.startDate) : undefined,
                            to: dateRange.endDate ? new Date(dateRange.endDate) : undefined,
                        }}
                        onSelect={handleDateSelect}
                    />
                )}
            </PopoverContent>
        </Popover>
    );
};

export default DateRangeSelector;
