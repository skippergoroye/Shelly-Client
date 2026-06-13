import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../partners/components/ui/sheet";
import TransactionDetailField from "./TransactionDetailField";
import TransactionStatusChip from "./TransactionStatusChip";
import { TransactionDetailResponseT } from "../types";
import { parseMoney } from "@/lib/utils";
import moment from "moment";

interface TransactionDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    detail: TransactionDetailResponseT | null;
    isLoading: boolean;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
    isOpen,
    onClose,
    detail,
    isLoading,
}) => {
    const txn = detail?.transaction;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="flex flex-col overflow-y-auto min-w-[600px]">
                <SheetHeader>
                    <SheetTitle>View Details</SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                    <hr className="mb-6" />

                    <div className="grid grid-cols-2 gap-x-8">
                        <TransactionDetailField
                            label="Created At"
                            value={txn?.createdAt ? moment(txn.createdAt).format("Do MMM, YYYY, HH:mm") : ""}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Customer Email"
                            value={txn?.email}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Customer Phone Number"
                            value={txn?.phoneNumber}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Transaction Reference"
                            value={txn?.reference}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Beneficiary Identifier"
                            value={txn?.productType}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Payment Item"
                            value={txn?.paymentItemName}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Transaction Type"
                            value={txn?.transactionType}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Payment Method"
                            value={txn?.paymentMethod}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Channel"
                            value={txn?.channel}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Account Number"
                            value={txn?.businessId}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Biller"
                            value={txn?.billerName}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Payment Item"
                            value={txn?.paymentItemName}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Card Type"
                            value={txn?.cardType}
                            isLoading={isLoading}
                        />

                        <TransactionDetailField
                            label="Amount Processed"
                            value={txn?.amountProccessed != null ? parseMoney(txn.amountProccessed) : ""}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Total Transaction Amount"
                            value={txn?.totalTransactionAmount != null ? parseMoney(txn.totalTransactionAmount) : ""}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Successful Transaction Amount"
                            value={txn?.successfulTransactionAmount != null ? parseMoney(txn.successfulTransactionAmount) : ""}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Total Transaction Items"
                            value={txn?.totalItem}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Total Successful Items"
                            value={txn?.totalSuccessful}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Total Processed Items"
                            value={txn?.totalProccessed}
                            isLoading={isLoading}
                        />
                        <TransactionDetailField
                            label="Surcharge"
                            value={txn?.surCharge != null ? parseMoney(txn.surCharge) : ""}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className="mt-2">
                        <p className="text-xs text-fontTextNormal mb-1 uppercase font-semibold">Status</p>
                        {isLoading ? (
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                        ) : (
                            txn?.status && <TransactionStatusChip status={txn.status} />
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default TransactionDetails;
