"use client";

import DataTable, {
  ColumnDef,
  SearchField,
} from "@/app/components/general/DataTable";
import {
  getFormMReport,
  FormMReportFilters,
} from "@/app/services/reportingService";
import { DateRange } from "@/app/components/general/DateFilter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { endpoints } from "@/app/constants/general";
import TableViewLink from "@/app/components/reports/TableViewLink";

interface FormMReportRow {
  id: number;
  baNumber: string | null;
  mfNumber: string | null;
  amount: string | null;
  applicantName: string | null;
  accountNumber: string | null;
  registrationDate: string | null;
}

export type ApiItem = {
  id: number;
  formId: number;
  status: string | null;
  baNumber: string | null;
  mfNumber: string | null;
  currency: string | null;
  applicantName: string | null;
  applicantTin: string | null;
  cuo: string | null;
  fob: string | null;
  amount: string | null;
  submissionDate: string | null;
  validationDate: string | null;
  registrationDate: string | null;
  validForForex: string | null;
  paymentMode: string | null;
  beneficiaryName: string | null;
  beneficiaryAddress: string | null;
  beneficiaryCountry: string | null;
  accountNumber: string | null;
  modeOfTransport: string | null;
  expiryDate: string | null;
  supplyCountryCode: string | null;
  supplyCountryName: string | null;
  dischargePortCode: string | null;
  dischargePortName: string | null;
  destinationPortName: string | null;
  customOfficeName: string | null;
  totalFreightCharges: number | null;
  totalCfValue: number | null;
  sourceOfFundsCode: string | null;
  sourceOfFunds: string | null;
  transferMode: string | null;
  totalNetWeight: number | null;
  totalGrossWeight: number | null;
  bankName: string | null;
  countryOfOrigin: string | null;
  applicantPhone: string | null;
  shipmentDate: string | null;
  hsCode: string | null;
  itemOfImport: string | null;
  createdAt: string | null;
  exchangeRate: string | null;
};

interface ApiResponse {
  list: ApiItem[];
  resultCode: number;
  noOfRecords: number;
  currentPageSize: number;
  currentPageNumber: number;
}

const SEARCH_FIELDS: SearchField[] = [
  { key: "baNumber", label: "BA Number", placeholder: "Enter BA number" },
  {
    key: "mfNumber",
    label: "MF Number",
    placeholder: "Enter MF number",
  },
  {
    key: "accountNumber",
    label: "Account Number",
    placeholder: "Enter account number",
  },
  {
    key: "amount",
    label: "Amount",
    placeholder: "Enter amount",
  },
];

const COLUMNS: ColumnDef<FormMReportRow>[] = [
  { key: "applicantName", label: "Applicant Name" },
  { key: "accountNumber", label: "Account Number" },
  { key: "amount", label: "Amount" },
  { key: "baNumber", label: "BA Number" },
  { key: "mfNumber", label: "MF Number" },
  { key: "registrationDate", label: "Date" },
];

const searchFieldMap: Record<string, keyof FormMReportFilters> = {
  baNumber: "formNumber",
  mfNumber: "applicationNumber",
  accountNumber: "accountNumber",
  amount: "formAmount",
};

const FormMReport = () => {
  const [state, setState] = useState({
    pageNumber: 1,
    pageSize: 10,
    filters: {} as FormMReportFilters,
  });

  const queryKey = "formMReport";

  const { data } = useQuery({
    queryKey: [queryKey, state],
    queryFn: () =>
      getFormMReport(state.pageNumber, state.pageSize, state.filters),
    retry: false,
  });

  const response = data?.data as ApiResponse | undefined;

  const rawItems = new Map<number, ApiItem>(
    response?.list?.map((item) => [item.id, item]) ?? [],
  );

  const tableData: FormMReportRow[] =
    response?.list?.map((item) => ({
      id: item.id,
      applicantName: item.applicantName,
      accountNumber: item.accountNumber,
      baNumber: item.baNumber,
      mfNumber: item.mfNumber,
      amount: item.amount,
      registrationDate: item.registrationDate,
    })) ?? [];

  const applyFilters = (
    fields: Record<string, string>,
    dateRange: DateRange,
  ) => {
    const next = Object.entries(searchFieldMap).reduce<FormMReportFilters>(
      (acc, [fieldKey, apiKey]) => {
        if (fields[fieldKey]) acc[apiKey] = fields[fieldKey];
        return acc;
      },
      {},
    );
    if (dateRange.startDate) {
      next.startDate = dateRange.startDate;
      next.dateField = "registrationDate";
    }
    if (dateRange.endDate) next.endDate = dateRange.endDate;
    setState((prev) => ({ ...prev, filters: next, pageNumber: 1 }));
  };

  return (
    <DataTable<FormMReportRow>
      title="Form M Report"
      description="This is an overview of Form M Report"
      columns={COLUMNS}
      data={tableData}
      searchFields={SEARCH_FIELDS}
      totalCount={response?.noOfRecords}
      page={state.pageNumber}
      rowsPerPage={state.pageSize}
      exportEndpoint={endpoints.reports.EXPORT_UBA_FORM_M_REPORT}
      dateField="registrationDate"
      dateFilterLabel="Registration Date"
      exportFilterMap={searchFieldMap}
      onPageChange={(page) =>
        setState((prev) => ({ ...prev, pageNumber: page }))
      }
      onRowsPerPageChange={(size) =>
        setState((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }))
      }
      onApplyFilters={applyFilters}
      rawData={Array.from(rawItems.values())}
      actionRenderer={(row) => <TableViewLink row={row} rawItems={rawItems} />}
    />
  );
};

export default FormMReport;
