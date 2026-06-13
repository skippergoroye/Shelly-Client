export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string;
  sizes: string[];
}

export interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}
