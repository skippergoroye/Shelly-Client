import { useState, useCallback, useEffect } from "react";
import { useFetchTransactionItemsQuery } from "@/api/transactions/transactionsEndpoints";
import { appToast } from "@/components/Toast/toast";
import { TransactionDetailResponseT } from "../types";

export const useTransactionDetails = () => {
    const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const {
        data: detailResponse,
        isFetching: isLoadingDetail,
        isError,
        error,
    } = useFetchTransactionItemsQuery(
        { transactionId: selectedTransactionId! },
        { skip: selectedTransactionId === null }
    );

    const transactionDetail: TransactionDetailResponseT | null =
        detailResponse?.status ? detailResponse.data : null;

    useEffect(() => {
        if (isError) {
            const err = error as any;
            appToast("error", err?.data?.message ?? "Failed to fetch transaction details.");
        }
    }, [isError, error]);

    useEffect(() => {
        if (detailResponse && !detailResponse.status) {
            appToast("error", detailResponse.message ?? "Failed to fetch transaction details.");
        }
    }, [detailResponse]);

    const openDrawer = useCallback((id: number) => {
        setSelectedTransactionId(id);
        setIsDrawerOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsDrawerOpen(false);
        setSelectedTransactionId(null);
    }, []);

    return {
        selectedTransactionId,
        isDrawerOpen,
        transactionDetail,
        isLoadingDetail,
        openDrawer,
        closeDrawer,
    };
};
