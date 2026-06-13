import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Download } from "lucide-react";
import Spinner from "@/components/ui/spinner";

interface ExportDropdownProps {
    onExportCSV: () => void;
    onExportExcel: () => void;
    onExportPDF: () => void;
    isExporting: boolean;
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({
    onExportCSV,
    onExportExcel,
    onExportPDF,
    isExporting,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="bg-white text-blue border border-blue hover:bg-white flex items-center gap-2">
                    {isExporting ? (
                        <Spinner />
                    ) : (
                        <Download className="h-4 w-4" />
                    )}
                    Export
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-0" align="end">
                <div className="py-1">
                    <button
                        onClick={onExportCSV}
                        disabled={isExporting}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Export as CSV
                    </button>
                    <button
                        onClick={onExportExcel}
                        disabled={isExporting}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Export as Excel
                    </button>
                    <button
                        onClick={onExportPDF}
                        disabled={isExporting}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Export as PDF
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ExportDropdown;
