import { CartItem } from "@/redux/features/cart/cartSlice";

export const calculateTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);




export const transformProducts = (products: any[]) => {
    return products.map((product) => ({
        id: product.id,
        title: product.title,
        name: product.title,
        alt: product.title,
        price: product.price,
        originalPrice: product.discountPercentage
            ? product.price / (1 - product.discountPercentage / 100)
            : product.price,
        image: product.images?.[0] || product.thumbnail,
        category: product.category,
        rating: product.rating || 4.5,
        reviews: Math.floor(Math.random() * 500) + 50,
        badge: product.discountPercentage > 0 ? 'SALE' : product.rating > 4.5 ? 'NEW' : undefined,
        badgeColor: product.discountPercentage > 0 ? 'bg-orange-600' : 'bg-blue-600',
    }));
};