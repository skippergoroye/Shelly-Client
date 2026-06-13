import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface AdvancedFilterButtonProps {
    onClick: () => void;
    activeFilterCount: number;
}

const AdvancedFilterButton: React.FC<AdvancedFilterButtonProps> = ({
    onClick,
    activeFilterCount,
}) => {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            className="flex items-center gap-2 text-blue border-blue hover:bg-blue-50"
        >
            Advanced Filter

            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue text-xs text-white">
                    {activeFilterCount}
                </span>
            )}
        </Button>
    );
};

export default AdvancedFilterButton;
