import React from "react";
import { cn } from "@/lib/utils";

interface TransactionStatusChipProps {
    status: string;
}

const STATUS_CONFIG: Record<string, { dot: string; text: string; label: string }> = {
    Successful: { dot: "bg-green-500", text: "text-green-700", label: "Successful" },
    successful: { dot: "bg-green-500", text: "text-green-700", label: "Successful" },
    SUCCESSFUL: { dot: "bg-green-500", text: "text-green-700", label: "Successful" },
    Failed: { dot: "bg-red-500", text: "text-red-700", label: "Failed" },
    failed: { dot: "bg-red-500", text: "text-red-700", label: "Failed" },
    FAILED: { dot: "bg-red-500", text: "text-red-700", label: "Failed" },
    Pending: { dot: "bg-yellow-500", text: "text-yellow-700", label: "Pending" },
    pending: { dot: "bg-yellow-500", text: "text-yellow-700", label: "Pending" },
    PENDING: { dot: "bg-yellow-500", text: "text-yellow-700", label: "Pending" },
};

const DEFAULT_CONFIG = { dot: "bg-gray-400", text: "text-gray-700", label: "" };

const TransactionStatusChip: React.FC<TransactionStatusChipProps> = ({ status }) => {
    const config = STATUS_CONFIG[status] || { ...DEFAULT_CONFIG, label: status };

    return (
        <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", config.dot)} />
            <span className={cn("text-sm", config.text)}>{config.label}</span>
        </div>
    );
};

export default TransactionStatusChip;
