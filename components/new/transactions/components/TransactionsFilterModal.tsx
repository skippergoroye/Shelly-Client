import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";
import moment from "moment";
import FilterSelectField from "./FilterSelectField";
import { TransactionFilterT, INITIAL_FILTER_STATE } from "../types";
import { FrameworkT } from "@/types/global";

interface TransactionsFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Partial<TransactionFilterT>) => void;
    onReset: () => void;
    currentFilters: TransactionFilterT;
    lookupData: {
        paymentMethods: any[];
        productTypes: any[];
        transactionTypes: any[];
        transactionStatuses: any[];
        isLoading: boolean;
    };
}

const toLookupOptions = (items: any[]): FrameworkT[] => {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
        value: item.id ?? item.value ?? item.name ?? item,
        label: item.name ?? item.label ?? item.description ?? String(item),
    }));
};

const TransactionsFilterModal: React.FC<TransactionsFilterModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    onReset,
    currentFilters,
    lookupData,
}) => {
    const formik = useFormik<TransactionFilterT>({
        initialValues: currentFilters,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        if (isOpen) {
            formik.resetForm({ values: currentFilters });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleDateSelect = (range: DateRange | undefined) => {
        formik.setFieldValue(
            "startDate",
            range?.from ? moment(range.from).format("YYYY-MM-DD") : ""
        );
        formik.setFieldValue(
            "endDate",
            range?.to ? moment(range.to).format("YYYY-MM-DD") : ""
        );
    };

    const handleReset = () => {
        formik.resetForm({ values: INITIAL_FILTER_STATE });
        onReset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 animate-in fade-in">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-blue">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="font-semibold">Filter</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-blue text-sm font-medium hover:underline"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="text-xs text-text-primary mb-1 block">
                            Transaction Reference Number{" "}
                            <span className="text-gray-400">(If Applicable)</span>
                        </label>
                        <Input
                            placeholder="Enter Transaction Reference"
                            value={formik.values.transactionReference}
                            onChange={(e) =>
                                formik.setFieldValue("transactionReference", e.target.value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-text-primary">
                                Start Date <span className="text-gray-400">(If Applicable)</span>
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="justify-start text-left font-normal h-[38px] text-text-primary bg-gray-input-fill border-none"
                                    >
                                        {formik.values.startDate || "Select Date"}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        disabled={{ after: new Date() }}
                                        selected={{
                                            from: formik.values.startDate
                                                ? new Date(formik.values.startDate)
                                                : undefined,
                                            to: formik.values.endDate
                                                ? new Date(formik.values.endDate)
                                                : undefined,
                                        }}
                                        onSelect={handleDateSelect}
                                        numberOfMonths={1}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-text-primary">
                                End Date <span className="text-gray-400">(If Applicable)</span>
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="justify-start text-left font-normal h-[38px] text-text-primary bg-gray-input-fill border-none"
                                    >
                                        {formik.values.endDate || "Select Date"}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        disabled={{ after: new Date() }}
                                        selected={{
                                            from: formik.values.startDate
                                                ? new Date(formik.values.startDate)
                                                : undefined,
                                            to: formik.values.endDate
                                                ? new Date(formik.values.endDate)
                                                : undefined,
                                        }}
                                        onSelect={handleDateSelect}
                                        numberOfMonths={1}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <FilterSelectField
                            label="Channel"
                            options={toLookupOptions(lookupData.paymentMethods)}
                            value={formik.values.channel}
                            onChange={(val) => formik.setFieldValue("channel", val)}
                            isLoading={lookupData.isLoading}
                        />

                        <FilterSelectField
                            label="Product Type"
                            options={toLookupOptions(lookupData.productTypes)}
                            value={formik.values.productType}
                            onChange={(val) => formik.setFieldValue("productType", val)}
                            isLoading={lookupData.isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <FilterSelectField
                            label="Transaction Type"
                            options={toLookupOptions(lookupData.transactionTypes)}
                            value={formik.values.transactionType}
                            onChange={(val) => formik.setFieldValue("transactionType", val)}
                            isLoading={lookupData.isLoading}
                        />

                        <FilterSelectField
                            label="Payment Channel"
                            options={toLookupOptions(lookupData.paymentMethods)}
                            value={formik.values.paymentMethod}
                            onChange={(val) => formik.setFieldValue("paymentMethod", val)}
                            isLoading={lookupData.isLoading}
                        />

                        <FilterSelectField
                            label="Statuses"
                            options={toLookupOptions(lookupData.transactionStatuses)}
                            value={formik.values.status}
                            onChange={(val) => formik.setFieldValue("status", val)}
                            isLoading={lookupData.isLoading}
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-text-primary">
                                Customer Phone No.{" "}
                                <span className="text-gray-400">(If Applicable)</span>
                            </label>
                            <Input
                                placeholder="Select Option"
                                value={formik.values.customerPhoneNumber}
                                onChange={(e) =>
                                    formik.setFieldValue("customerPhoneNumber", e.target.value)
                                }
                                className="h-[38px]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-text-primary">
                                Beneficiary Identifier{" "}
                                <span className="text-gray-400">(If Applicable)</span>
                            </label>
                            <Input
                                placeholder="Select Option"
                                value={formik.values.beneficiaryIdentifier}
                                onChange={(e) =>
                                    formik.setFieldValue("beneficiaryIdentifier", e.target.value)
                                }
                                className="h-[38px]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="min-w-[160px]"
                        >
                            Reset Parameters
                        </Button>
                        <Button
                            type="submit"
                            className="min-w-[160px] bg-blue text-white hover:bg-blue/90"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionsFilterModal;
