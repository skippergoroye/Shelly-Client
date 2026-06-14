export const ORDER_TABS: { value: string; label: string; filter?: string }[] = [
  { value: "all",        label: "All Orders"  },
  { value: "pending",    label: "Pending",    filter: "pending"    },
  { value: "processing", label: "Processing", filter: "processing" },
  { value: "shipped",    label: "Shipped",    filter: "shipped"    },
  { value: "delivered",  label: "Delivered",  filter: "delivered"  },
];
