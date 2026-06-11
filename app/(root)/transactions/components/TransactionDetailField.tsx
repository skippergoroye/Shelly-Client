import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionDetailFieldProps {
    label: string;
    value: string | number | ReactNode;
    isLoading?: boolean;
}

const TransactionDetailField: React.FC<TransactionDetailFieldProps> = ({
    label,
    value,
    isLoading = false,
}) => {
    return (
        <div className="mb-4">
            <p className="text-xs text-fontTextNormal mb-1 uppercase font-semibold">{label}</p>
            {isLoading ? (
                <Skeleton className="h-5 w-full rounded-md" />
            ) : (
                <p className="text-sm text-fontBlack font-medium">
                    {value || "-"}
                </p>
            )}
        </div>
    );
};

export default TransactionDetailField;
