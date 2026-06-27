"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ApiTransaction, useGetAdminTransactionsQuery } from "@/redux/features/admin/transactions/adminTransactionApi";

export type TxnStatus = "Paid" | "Pending" | "Failed";
export type MethodType = "card" | "wire" | "stripe";

export interface TransactionRow {
  _id: string;
  id: string;
  customerName: string;
  customerInit: string;
  amount: number;
  date: string;
  methodType: MethodType;
  methodLabel: string;
  status: TxnStatus;
}

function toMethodType(channel: string): MethodType {
  if (channel === "wire") return "wire";
  if (channel === "stripe") return "stripe";
  return "card";
}

function toRow(t: ApiTransaction): TransactionRow {
  const initials = t.customerName
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const status = (t.status.charAt(0).toUpperCase() + t.status.slice(1)) as TxnStatus;

  return {
    _id: t._id,
    id: `#${t.transactionId}`,
    customerName: t.customerName,
    customerInit: initials,
    amount: t.amount,
    date: t.paidAt
      ? new Date(t.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "—",
    methodType: toMethodType(t.channel),
    methodLabel: t.paymentMethod ?? t.channel,
    status,
  };
}

export const useTransactions = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isFetching, isError, refetch } = useGetAdminTransactionsQuery({
    status: statusFilter && statusFilter !== "all" ? statusFilter : undefined,
    search: debouncedSearch || undefined,
    date: dateFilter || undefined,
    page,
    limit: 10,
  });

  const rows = useMemo<TransactionRow[]>(
    () => (data?.transactions ?? []).map(toRow),
    [data]
  );

  const applyFilters = (status: string, search: string, date: string) => {
    setStatusFilter(status);
    setSearchQuery(search);
    setDateFilter(date);
    setPage(1);
  };

  return {
    rows,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    setPage,
    isFetching,
    isError,
    refetch,
    applyFilters,
  };
};
