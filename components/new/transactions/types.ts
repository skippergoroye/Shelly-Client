export interface TransactionT {
    id: number;
    phoneNumber: string;
    email: string;
    reference: string;
    amountProccessed: number;
    successfulTransactionAmount: number;
    currencyCode: string;
    countryCode: string;
    transactionType: string;
    identifier: string;
    createdAt: string;
    userId: string;
    channel: string;
    metadata: string;
    businessId: string;
    totalItem: number;
    totalSuccessful: number;
    totalProccessed: number;
    expectingOTP: boolean;
    expecting3DS: boolean;
    isValidOTPReceived: boolean;
    otpFailed: boolean;
    isItemsEmpty: boolean;
    surCharge: number;
    status: string;
    paymentMethod: string;
    totalTransactionAmount: number;
    productType: string;
    billerName: string;
    billerCode: string;
    paymentItemName: string;
    cardType: string;
}

export interface TransactionItemT {
    id: number;
    amount: number;
    transactionId: number;
    identifier: string;
    code: string;
    billerId: string;
    billerCode: string;
    billerName: string;
    paymentItemName: string;
    status: string;
    responseData: string;
    index: number;
    processorReference: string;
    statusChangedAt: string;
    lock: string;
    isOTPValidated: boolean;
    receivedOTP: string;
    otpReceivedAt: string;
    requestRef: string;
    narration: string;
}

export interface TransactionFilterT {
    startDate: string;
    endDate: string;
    channel: string;
    paymentMethod: string | number;
    productType: string | number;
    transactionType: string | number;
    status: string | number;
    customerPhoneNumber: string;
    beneficiaryIdentifier: string;
    transactionReference: string;
}

export interface TransactionDetailResponseT {
    transaction: TransactionT;
    pagedData: {
        pager: PagerT;
        data: TransactionItemT[];
    };
    paymentItems: PaymentItemOptionT[];
}

export interface PagerT {
    totalItemCount: number;
    filter: string;
    currentPage: number;
    itemCountPerPage: number;
    pageSize: number;
    pageNo: number;
}

export interface LookupOptionT {
    id: number;
    name: string;
}

export interface PaymentItemOptionT {
    code: string;
    name: string;
}

export interface DateRangeT {
    startDate: string;
    endDate: string;
}

export const INITIAL_FILTER_STATE: TransactionFilterT = {
    startDate: "",
    endDate: "",
    channel: "",
    paymentMethod: "",
    productType: "",
    transactionType: "",
    status: "",
    customerPhoneNumber: "",
    beneficiaryIdentifier: "",
    transactionReference: "",
};
