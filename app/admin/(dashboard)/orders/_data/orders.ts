export interface Order {
  uid: string; // URL-safe identifier
  id: string;  // display reference e.g. #HR-9021
  customerName: string;
  customerAvatar?: string;
  customerInit?: string;
  customerInitBg?: string;
  // Delivery Address
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  // Contact Information
  email: string;
  phone: string;
  mobile: string;
  // Order Info
  items: string;
  total: number;
  paymentStatus: "PAID" | "AWAITING" | "FAILED";
  orderStatus: "Processing" | "Pending" | "Shipped" | "Delivered";
  orderDate: string;
  estimatedDelivery: string;
}

export const INITIAL_ORDERS: Order[] = [
  {
    uid: "HR-9021",
    id: "#HR-9021",
    customerName: "Julian Draxler",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    customerInit: "JD",
    firstName: "Julian",
    lastName: "Draxler",
    streetAddress: "1280 Savile Row, Mayfair",
    city: "London",
    state: "UK",
    email: "julian@bespoke.com",
    phone: "+234 800 000 0001",
    mobile: "+234 801 000 0001",
    items: "1x Bespoke Oxford",
    total: 1250.0,
    paymentStatus: "PAID",
    orderStatus: "Processing",
    orderDate: "Jun 10, 2026",
    estimatedDelivery: "Jun 17, 2026",
  },
  {
    uid: "HR-9022",
    id: "#HR-9022",
    customerName: "Sarah Miller",
    customerInit: "SM",
    customerInitBg: "bg-pink-100 text-pink-600",
    firstName: "Sarah",
    lastName: "Miller",
    streetAddress: "350 Fifth Ave, Midtown",
    city: "New York",
    state: "NY",
    email: "sarah.miller@example.com",
    phone: "+1 646 000 0002",
    mobile: "+1 917 000 0002",
    items: "2x Calfskin Derby",
    total: 2800.0,
    paymentStatus: "AWAITING",
    orderStatus: "Pending",
    orderDate: "Jun 11, 2026",
    estimatedDelivery: "Jun 18, 2026",
  },
  {
    uid: "HR-9023",
    id: "#HR-9023",
    customerName: "Robert Chen",
    customerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    customerInit: "RC",
    firstName: "Robert",
    lastName: "Chen",
    streetAddress: "2-1 Nihonbashi Muromachi",
    city: "Tokyo",
    state: "Chuo",
    email: "robert.chen@nihon.jp",
    phone: "+81 80 0000 0003",
    mobile: "+81 90 0000 0003",
    items: "1x Suede Loafer",
    total: 950.0,
    paymentStatus: "PAID",
    orderStatus: "Shipped",
    orderDate: "Jun 09, 2026",
    estimatedDelivery: "Jun 16, 2026",
  },
  {
    uid: "HR-9024",
    id: "#HR-9024",
    customerName: "Elena Belova",
    customerInit: "EB",
    customerInitBg: "bg-blue-100 text-blue-600",
    firstName: "Elena",
    lastName: "Belova",
    streetAddress: "24 Rue Saint-Honoré",
    city: "Paris",
    state: "Île-de-France",
    email: "elena.belova@maison.fr",
    phone: "+33 6 00 00 00 04",
    mobile: "+33 7 00 00 00 04",
    items: "1x Chelsea Boot",
    total: 1400.0,
    paymentStatus: "PAID",
    orderStatus: "Delivered",
    orderDate: "Jun 05, 2026",
    estimatedDelivery: "Jun 12, 2026",
  },
];
