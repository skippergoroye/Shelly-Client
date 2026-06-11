import { useState, useCallback, useEffect } from "react";
import { useDebouncedTerm } from "@/hooks/useDebouncedTerm";
import { useFetchTransactionsMutation } from "@/api/transactions/transactionsEndpoints";
import { appToast } from "@/components/Toast/toast";
import { TransactionT, TransactionFilterT } from "../types";

interface UseTransactionsParams {
    activeFilters: Partial<TransactionFilterT>;
}

export const useTransactions = ({ activeFilters }: UseTransactionsParams) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [transactions, setTransactions] = useState<TransactionT[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const debouncedSearchQuery = useDebouncedTerm(searchQuery, 500);
    const [fetchTransactionsApi] = useFetchTransactionsMutation();

    const fetchTransactions = useCallback(async () => {
        setIsFetching(true);
        try {
            const payload = {
                itemCountPerPage: pageSize,
                currentPage: page,
                filter: {
                    transactionReference: debouncedSearchQuery || "",
                    ...activeFilters,
                },
                downloadReport: false,
                format: "",
            };

            const response = await fetchTransactionsApi(payload).unwrap();
            if (response?.status) {
                const items = response?.data?.data ?? [];
                setTransactions(items);
                const total = response?.data?.pager?.totalItemCount ?? items.length;
                setTotalResults(total);
            } else {
                appToast("error", response?.message ?? "Failed to fetch transactions.");
            }
        } catch (error: any) {
            appToast("error", error?.data?.message ?? "Failed to fetch transactions.");
        } finally {
            setIsFetching(false);
        }
    }, [fetchTransactionsApi, page, pageSize, debouncedSearchQuery, activeFilters]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const totalPages = Math.max(1, Math.ceil((totalResults || 0) / pageSize));
    const startIndex = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
    const endIndex = totalResults === 0 ? 0 : Math.min(page * pageSize, totalResults);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        setPage(1);
    }, []);

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setPage(1);
    }, []);

    return {
        searchQuery,
        setSearchQuery: handleSearchChange,
        page,
        setPage,
        pageSize,
        setPageSize: handlePageSizeChange,
        transactions,
        totalResults,
        isFetching,
        totalPages,
        startIndex,
        endIndex,
        refetch: fetchTransactions,
    };
};
