import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionsPaginationProps {
    totalResults: number;
    page: number;
    pageSize: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({
    totalResults,
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    onPageChange,
    onPageSizeChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-text-secondary">
                {totalResults} results found
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Rows per page:</span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 min-w-[60px] justify-between"
                            >
                                {pageSize}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[80px] p-0" align="start">
                            <div className="py-1">
                                {[10, 20, 50, 100].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => onPageSizeChange(size)}
                                        className={cn(
                                            "w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                                            pageSize === size && "bg-gray-100"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="text-sm text-text-secondary">
                    {startIndex}-{endIndex} of {totalResults}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="h-8 w-8"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        disabled={page >= totalPages}
                        className="h-8 w-8"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPagination;
