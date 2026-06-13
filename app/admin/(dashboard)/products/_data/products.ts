export interface Product {
  id: string;
  sku: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
  sizes?: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "HEIR-001",
    name: "The Volt Derby",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120&h=120",
    category: "Bespoke Casual",
    price: 850,
    stock: 12,
    stockStatus: "In Stock",
    description: "",
    sizes: ["38", "39", "40", "41"],
  },
  {
    id: "2",
    sku: "HEIR-042",
    name: "Onyx Chelsea",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=120&h=120",
    category: "Evening Collection",
    price: 1200,
    stock: 3,
    stockStatus: "Low Stock",
    description: "",
    sizes: ["40", "43", "44"],
  },
  {
    id: "3",
    sku: "HEIR-088",
    name: "Cloud Runner V2",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=120&h=120",
    category: "Artisanal Sport",
    price: 650,
    stock: 0,
    stockStatus: "Out of Stock",
    description: "",
    sizes: ["41", "42", "43"],
  },
  {
    id: "4",
    sku: "HEIR-015",
    name: "The Heritage Brogue",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=120&h=120",
    category: "Traditional Craft",
    price: 980,
    stock: 24,
    stockStatus: "In Stock",
    description: "",
    sizes: ["39", "40", "41", "42", "43"],
  },
];
