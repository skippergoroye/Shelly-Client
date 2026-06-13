import { useState, useCallback } from "react";
import { useFetchTransactionsMutation } from "@/api/transactions/transactionsEndpoints";
import { appToast } from "@/components/Toast/toast";
import { TransactionT, TransactionFilterT } from "../types";
import { parseMoney } from "@/lib/utils";

const CSV_HEADERS = [
    "Created At",
    "Transaction Ref",
    "Beneficiary Name",
    "Biller",
    "Beneficiary Identifier",
    "Transaction Type",
    "Status",
    "Amount",
    "Surcharge",
    "Payment Method",
    "Channel",
];

const escapeCSV = (value: string | number | undefined): string => {
    const str = String(value ?? "");
    return `"${str.replace(/"/g, '""')}"`;
};

const transactionToCSVRow = (txn: TransactionT): string => {
    return [
        escapeCSV(txn.createdAt),
        escapeCSV(txn.reference),
        escapeCSV(txn.paymentItemName),
        escapeCSV(txn.billerName),
        escapeCSV(txn.paymentItemName),
        escapeCSV(txn.transactionType),
        escapeCSV(txn.status),
        escapeCSV(parseMoney(txn.amountProccessed)),
        escapeCSV(parseMoney(txn.surCharge)),
        escapeCSV(txn.paymentMethod),
        escapeCSV(txn.channel),
    ].join(",");
};

export const useTransactionExport = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [fetchTransactionsApi] = useFetchTransactionsMutation();

    const exportAsCSV = useCallback((transactions: TransactionT[]) => {
        try {
            const csvContent = [
                CSV_HEADERS.join(","),
                ...transactions.map(transactionToCSVRow),
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `transactions-${new Date().toISOString().split("T")[0]}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            appToast("success", "Transactions exported as CSV successfully.");
        } catch {
            appToast("error", "Failed to export transactions as CSV.");
        }
    }, []);

    const exportAsExcel = useCallback(async (activeFilters: Partial<TransactionFilterT>) => {
        setIsExporting(true);
        try {
            const payload = {
                itemCountPerPage: 10000,
                currentPage: 1,
                filter: { ...activeFilters },
                downloadReport: true,
                format: "excel",
            };

            const response = await fetchTransactionsApi(payload).unwrap();

            if (response?.status && response?.data) {
                const downloadUrl = response.data.url || response.data;
                if (typeof downloadUrl === "string" && downloadUrl.startsWith("http")) {
                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.download = `transactions-${new Date().toISOString().split("T")[0]}.xlsx`;
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                appToast("success", "Transactions exported as Excel successfully.");
            } else {
                appToast("error", response?.message ?? "Failed to export transactions.");
            }
        } catch (error: any) {
            appToast("error", error?.data?.message ?? "Failed to export transactions as Excel.");
        } finally {
            setIsExporting(false);
        }
    }, [fetchTransactionsApi]);

    const exportAsPDF = useCallback(async (activeFilters: Partial<TransactionFilterT>) => {
        setIsExporting(true);
        try {
            const payload = {
                itemCountPerPage: 10000,
                currentPage: 1,
                filter: { ...activeFilters },
                downloadReport: true,
                format: "pdf",
            };

            const response = await fetchTransactionsApi(payload).unwrap();

            if (response?.status && response?.data) {
                const downloadUrl = response.data.url || response.data;
                if (typeof downloadUrl === "string" && downloadUrl.startsWith("http")) {
                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.download = `transactions-${new Date().toISOString().split("T")[0]}.pdf`;
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                appToast("success", "Transactions exported as PDF successfully.");
            } else {
                appToast("error", response?.message ?? "Failed to export transactions.");
            }
        } catch (error: any) {
            appToast("error", error?.data?.message ?? "Failed to export transactions as PDF.");
        } finally {
            setIsExporting(false);
        }
    }, [fetchTransactionsApi]);

    return {
        isExporting,
        exportAsCSV,
        exportAsExcel,
        exportAsPDF,
    };
};
