import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/dataTable";
import { TransactionT } from "../types";
import TransactionStatusChip from "./TransactionStatusChip";
import TransactionActionsMenu from "./TransactionActionsMenu";
import moment from "moment";
import { parseMoney } from "@/lib/utils";

interface TransactionsTableProps {
    data: TransactionT[];
    isLoading: boolean;
    onViewDetails: (id: number) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
    data,
    isLoading,
    onViewDetails,
}) => {
    const columns: ColumnDef<TransactionT>[] = useMemo(
        () => [
            {
                accessorKey: "createdAt",
                header: "Created at",
                cell: ({ row }) => {
                    const date = row.getValue("createdAt") as string;
                    return date ? moment(date).format("Do MMM YYYY") : "-";
                },
            },
            {
                accessorKey: "reference",
                header: "Transaction Ref",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "billerName",
                header: "Biller",
            },
            {
                accessorKey: "amountProccessed",
                header: "Amount",
                cell: ({ row }) => {
                    const amount = row.original.amountProccessed;
                    return amount ? parseMoney(amount) : row.getValue("billerName") || "-";
                },
            },
            {
                accessorKey: "identifier",
                header: "Identifier",
                cell: ({ row }) => {
                    return row.original.identifier || "-";
                },
            },
            {
                accessorKey: "transactionType",
                header: "Transaction Type",
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status") as string;
                    return <TransactionStatusChip status={status} />;
                },
            },
            {
                id: "actions",
                header: "",
                cell: ({ row }) => {
                    return (
                        <TransactionActionsMenu
                            onViewDetails={() => onViewDetails(row.original.id)}
                        />
                    );
                },
            },
        ],
        [onViewDetails]
    );

    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-text-primary">Recent Transactions</h2>
            </div>
            <DataTable
                columns={columns}
                data={data}
                loading={isLoading}
                emptyDataMessage="No transactions found."
            />
        </div>
    );
};

export default TransactionsTable;
