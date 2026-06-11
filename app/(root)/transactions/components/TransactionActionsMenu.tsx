import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";

interface TransactionActionsMenuProps {
    onViewDetails: () => void;
}

const TransactionActionsMenu: React.FC<TransactionActionsMenuProps> = ({
    onViewDetails,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
                <div className="py-1">
                    <button
                        onClick={onViewDetails}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                        View Details
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TransactionActionsMenu;
