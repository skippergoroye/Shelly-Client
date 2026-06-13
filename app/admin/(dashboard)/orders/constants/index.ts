import { Order } from "./../_components/OrdersTable";

export const ORDER_TABS: { value: string; label: string; filter?: Order["orderStatus"] }[] = [
  { value: "all",        label: "All Orders"  },
  { value: "pending",    label: "Pending",    filter: "Pending"    },
  { value: "processing", label: "Processing", filter: "Processing" },
  { value: "shipped",    label: "Shipped",    filter: "Shipped"    },
  { value: "delivered",  label: "Delivered",  filter: "Delivered"  },
];