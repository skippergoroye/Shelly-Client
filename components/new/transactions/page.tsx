"use client";

import React, { useEffect, useMemo } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useTransactions } from "./hooks/useTransactions";
import { useTransactionDetails } from "./hooks/useTransactionDetails";
import { useTransactionFilters } from "./hooks/useTransactionFilters";
import { useTransactionExport } from "./hooks/useTransactionExport";
import TransactionsFilters from "./components/TransactionsFilters";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsPagination from "./components/TransactionsPagination";
import TransactionDetails from "./components/TransactionDetails";
import TransactionsFilterModal from "./components/TransactionsFilterModal";

const Transactions = () => {
    const { setPageTitle } = usePageTitle();

    useEffect(() => {
        setPageTitle("Transactions");
    }, [setPageTitle]);

    const {
        filterState,
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
    } = useTransactionFilters();

    const activeFilters = useMemo(() => buildActiveFilters(), [buildActiveFilters]);

    const {
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        pageSize,
        setPageSize,
        transactions,
        totalResults,
        isFetching,
        totalPages,
        startIndex,
        endIndex,
    } = useTransactions({ activeFilters });

    const {
        isDrawerOpen,
        transactionDetail,
        isLoadingDetail,
        openDrawer,
        closeDrawer,
    } = useTransactionDetails();

    const { isExporting, exportAsCSV, exportAsExcel, exportAsPDF } = useTransactionExport();

    return (
        <>
            <div className="p-6 space-y-6">
                <TransactionsFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                    onPresetSelect={handlePresetSelect}
                    onAdvancedFilterClick={() => setShowFilterModal(true)}
                    activeFilterCount={activeFilterCount}
                    onExportCSV={() => exportAsCSV(transactions)}
                    onExportExcel={() => exportAsExcel(activeFilters)}
                    onExportPDF={() => exportAsPDF(activeFilters)}
                    isExporting={isExporting}
                />

                <TransactionsTable
                    data={transactions}
                    isLoading={isFetching}
                    onViewDetails={openDrawer}
                />

                <TransactionsPagination
                    totalResults={totalResults}
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                />
            </div>

            <TransactionDetails
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                detail={transactionDetail}
                isLoading={isLoadingDetail}
            />

            <TransactionsFilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onSubmit={(values) => {
                    applyFilters(values);
                    setPage(1);
                }}
                onReset={() => {
                    resetFilters();
                    setPage(1);
                }}
                currentFilters={{
                    ...filterState,
                    transactionReference: searchQuery,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                }}
                lookupData={lookupData}
            />
        </>
    );
};

export default Transactions;
