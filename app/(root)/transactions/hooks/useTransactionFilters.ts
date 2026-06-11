import { useState, useCallback, useMemo } from "react";
import moment from "moment";
import {
    useGetPaymentMethodsQuery,
    useGetProductTypesQuery,
    useGetTransactionTypesQuery,
    useGetTransactionStatusesQuery,
} from "@/api/transactions/transactionsEndpoints";
import { TransactionFilterT, DateRangeT, INITIAL_FILTER_STATE } from "../types";

export const DATE_RANGE_PRESETS = [
    {
        label: "Today",
        value: () => {
            const today = moment().format("YYYY-MM-DD");
            return { startDate: today, endDate: today };
        },
    },
    {
        label: "7 days",
        value: () => ({
            startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
        }),
    },
    {
        label: "30 days",
        value: () => ({
            startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
        }),
    },
];

export const useTransactionFilters = () => {
    const [filterState, setFilterState] = useState<TransactionFilterT>(INITIAL_FILTER_STATE);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [dateRange, setDateRange] = useState<DateRangeT>({ startDate: "", endDate: "" });

    const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethodsQuery({});
    const { data: productTypes, isLoading: isLoadingProductTypes } = useGetProductTypesQuery({});
    const { data: transactionTypes, isLoading: isLoadingTransactionTypes } = useGetTransactionTypesQuery({});
    const { data: transactionStatuses, isLoading: isLoadingStatuses } = useGetTransactionStatusesQuery({});

    const lookupData = useMemo(() => ({
        paymentMethods: paymentMethods?.data ?? paymentMethods ?? [],
        productTypes: productTypes?.data ?? productTypes ?? [],
        transactionTypes: transactionTypes?.data ?? transactionTypes ?? [],
        transactionStatuses: transactionStatuses?.data ?? transactionStatuses ?? [],
        isLoading: isLoadingPaymentMethods || isLoadingProductTypes || isLoadingTransactionTypes || isLoadingStatuses,
    }), [
        paymentMethods, productTypes, transactionTypes, transactionStatuses,
        isLoadingPaymentMethods, isLoadingProductTypes, isLoadingTransactionTypes, isLoadingStatuses,
    ]);

    const applyFilters = useCallback((values: Partial<TransactionFilterT>) => {
        setFilterState((prev) => ({ ...prev, ...values }));
        setShowFilterModal(false);
    }, []);

    const resetFilters = useCallback(() => {
        setFilterState(INITIAL_FILTER_STATE);
        setDateRange({ startDate: "", endDate: "" });
    }, []);

    const handleDateRangeChange = useCallback((range: DateRangeT) => {
        setDateRange(range);
    }, []);

    const handlePresetSelect = useCallback((preset: () => DateRangeT) => {
        const range = preset();
        setDateRange(range);
    }, []);

    const buildActiveFilters = useCallback((): Partial<TransactionFilterT> => {
        const filters: Partial<TransactionFilterT> = {};

        if (dateRange.startDate) filters.startDate = dateRange.startDate;
        if (dateRange.endDate) filters.endDate = dateRange.endDate;
        if (filterState.channel) filters.channel = filterState.channel;
        if (filterState.paymentMethod) filters.paymentMethod = filterState.paymentMethod;
        if (filterState.productType) filters.productType = filterState.productType;
        if (filterState.transactionType) filters.transactionType = filterState.transactionType;
        if (filterState.status) filters.status = filterState.status;
        if (filterState.customerPhoneNumber) filters.customerPhoneNumber = filterState.customerPhoneNumber;
        if (filterState.beneficiaryIdentifier) filters.beneficiaryIdentifier = filterState.beneficiaryIdentifier;
        if (filterState.transactionReference) filters.transactionReference = filterState.transactionReference;

        return filters;
    }, [dateRange, filterState]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filterState.channel) count++;
        if (filterState.paymentMethod) count++;
        if (filterState.productType) count++;
        if (filterState.transactionType) count++;
        if (filterState.status) count++;
        if (filterState.customerPhoneNumber) count++;
        if (filterState.beneficiaryIdentifier) count++;
        if (filterState.transactionReference) count++;
        return count;
    }, [filterState]);

    return {
        filterState,
        setFilterState,
        showFilterModal,
        setShowFilterModal,
        dateRange,
        handleDateRangeChange,
        handlePresetSelect,
        lookupData,
        applyFilters,
        resetFilters,
        buildActiveFilters,
        activeFilterCount,
    };
};
