export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string;
  rating: number;
  badge?: "NEW" | "SALE";
  badgeColor?: "bg-blue-600" | "bg-orange-600";
}

export interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}