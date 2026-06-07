"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useReportStore from "@/app/stores/useReportStore";
import ReportOverview, {
  OverviewField,
} from "@/app/components/reports/ReportOverview";
import { ApiItem } from "../page";

const FormMReportDetail = () => {
  const router = useRouter();
  const { selectedItem } = useReportStore();
  const item = selectedItem as ApiItem | null;

  useEffect(() => {
    if (!item) router.back();
  }, [item, router]);

  if (!item) return null;

  const fields: OverviewField[] = [
    { label: "Status", value: item.status },
    { label: "BA Number", value: item.baNumber },
    { label: "MF Number", value: item.mfNumber },
    { label: "Currency", value: item.currency },
    { label: "Applicant Name", value: item.applicantName },
    { label: "Applicant TIN", value: item.applicantTin },
    { label: "CUO", value: item.cuo },
    { label: "FOB", value: item.fob },
    { label: "Amount", value: item.amount },
    { label: "Submission Date", value: item.submissionDate },
    { label: "Validation Date", value: item.validationDate },
    { label: "Registration Date", value: item.registrationDate },
    { label: "Valid for Forex", value: item.validForForex },
    { label: "Payment Mode", value: item.paymentMode },
    { label: "Beneficiary Name", value: item.beneficiaryName },
    { label: "Beneficiary Address", value: item.beneficiaryAddress },
    { label: "Beneficiary Country", value: item.beneficiaryCountry },
    { label: "Account Number", value: item.accountNumber },
    { label: "Mode of Transport", value: item.modeOfTransport },
    { label: "Expiry Date", value: item.expiryDate },
    { label: "Supply Country Code", value: item.supplyCountryCode },
    { label: "Supply Country Name", value: item.supplyCountryName },
    { label: "Discharge Port Code", value: item.dischargePortCode },
    { label: "Discharge Port Name", value: item.dischargePortName },
    { label: "Destination Port Name", value: item.destinationPortName },
    { label: "Custom Office Name", value: item.customOfficeName },
    { label: "Total Freight Charges", value: item.totalFreightCharges },
    { label: "Total CF Value", value: item.totalCfValue },
    { label: "Source of Funds Code", value: item.sourceOfFundsCode },
    { label: "Source of Funds", value: item.sourceOfFunds },
    { label: "Transfer Mode", value: item.transferMode },
    { label: "Total Net Weight", value: item.totalNetWeight },
    { label: "Total Gross Weight", value: item.totalGrossWeight },
    { label: "Bank Name", value: item.bankName },
    { label: "Country of Origin", value: item.countryOfOrigin },
    { label: "Applicant Phone", value: item.applicantPhone },
    { label: "Shipment Date", value: item.shipmentDate },
    { label: "HS Code", value: item.hsCode },
    { label: "Item of Import", value: item.itemOfImport },
    { label: "Created At", value: item.createdAt },
    { label: "Exchange Rate", value: item.exchangeRate },
  ];

  return <ReportOverview title="Report Overview" fields={fields} />;
};

export default FormMReportDetail;
