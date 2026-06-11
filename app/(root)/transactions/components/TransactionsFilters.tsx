import React from "react";
import SearchInput from "./SearchInput";
import DateRangeSelector from "./DateRangeSelector";
import AdvancedFilterButton from "./AdvancedFilterButton";
import ExportDropdown from "./ExportDropdown";
import { DateRangeT } from "../types";

interface TransactionsFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    dateRange: DateRangeT;
    onDateRangeChange: (range: DateRangeT) => void;
    onPresetSelect: (preset: () => DateRangeT) => void;
    onAdvancedFilterClick: () => void;
    activeFilterCount: number;
    onExportCSV: () => void;
    onExportExcel: () => void;
    onExportPDF: () => void;
    isExporting: boolean;
}

const TransactionsFilters: React.FC<TransactionsFiltersProps> = ({
    searchQuery,
    onSearchChange,
    dateRange,
    onDateRangeChange,
    onPresetSelect,
    onAdvancedFilterClick,
    activeFilterCount,
    onExportCSV,
    onExportExcel,
    onExportPDF,
    isExporting,
}) => {
    return (
        <div className="space-y-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AdvancedFilterButton
                        onClick={onAdvancedFilterClick}
                        activeFilterCount={activeFilterCount}
                    />
                    <DateRangeSelector
                        dateRange={dateRange}
                        onDateRangeChange={onDateRangeChange}
                        onPresetSelect={onPresetSelect}
                    />
                </div>
                <ExportDropdown
                    onExportCSV={onExportCSV}
                    onExportExcel={onExportExcel}
                    onExportPDF={onExportPDF}
                    isExporting={isExporting}
                />
            </div>
        </div>
    );
};

export default TransactionsFilters;
