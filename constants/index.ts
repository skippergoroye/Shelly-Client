// import { Product } from '@/app/shop/_components/product-grid';
import { Product } from '@/app/products/_components/product-grid';
import { Truck, Shield, Headphones } from 'lucide-react';

export const categories = [
    {
        title: 'Electronics',
        description: 'Next-gen performance and design.',
        badge: '500+ Products',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBWu2rMV6WSiE7-CdUnb6kzmdWwYAhOxIs2nj9hz9s3EI7kp7CEuU_Y4js59KFEhj5W47eFYTE9l7qILyc8FSxboO2R4ckYQtIC1fHaTMlibpLz3jJ3GVTcYzrt6UaKIkTYt8hRt_n96cddHWug_khNahltqSq6R9Ikk9Jf3Vuxq4tLZpLMchBprsTbP0Q3mtDpzeWBI5keNBYYf3Yla5c6Wu64q8QyvH7n7Fz11KaG2yj0METl0tyeA0I624nWpa1TlkYa0oKi6Q',
        isLarge: true,
    },
    {
        title: 'Fashion',
        description: 'Timeless styles for the modern individual.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD8hsCxy1-QaHrBraQ6c3DZz1bg0iFbImqouIu_7e4RmjtiSsTm3dhCdrLxYtrRQNvo17ngsQfd4R-FMypDfbQXYmeJ_pB0qCLdFRDvoMlqgWY2Rm-cRHSpV4nwfThfxaSS1YBFXDQkU-SF9PFzkebV1VMrHQf3YhYK9ZlseyWio6L3773aZmWnrDy21PYISZYN3zEn8x2USgQd-LDBnyNuY_FI-xx_PLyZ5WJEyJAAsgJwm2LZM3y7dWuDWOBDEzeAYNZf16o8yQ',
        isLarge: true,
    },
    {
        title: 'Home Decor',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJNa3aPIy_-w5Av9qOg_vQWrraGXeqeWjUf1L2AE9BjfvakR8WvC_PqUOES7oiYs9vq0s8qpHKiAWVTva7Jd_74yAYKpM85DW2fJX_Du3_pK3vTVpKC-4urDwKxH9Sz9AKtrOiSZFKC6opOQe3C3LmcVemQZ2ZmdQSqrLbEnOICkY5FXc2flEaDCkfZFHTp8hiDHshF_OrChIV0gWdPuSxwPejTRCZnmaYxH7Z227SNzjyEqMq-kYmeraxtT4JCbrKtfrznpqdg',
    },
    {
        title: 'Accessories',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAOFpjEQ-QXa1v_Vl12BHpKk_MCdAHJ36FQuGiwFx48ijAe_WC_qrd__iT8rPGlr3WYzxKzHGz-J8YPz1uJdG7Q8DVD5osu6kRCpn6f0yycmHG3P3A11qXSiUPi5ojLYCI9p2UI0aOvEz-rIRqtmgisQCwXHzWD6PzaKRxA_i0YG-LlMwMNYUoIE8DqjLVJ6EQsgo0vLwO0tES05lVEZPrYi4hg2sOleG23dDJWOcCY7xOKrVM1ZnGMftBxTK-IyQhVL-ZB425SEg',
    },
];





 export const products = [
    {
      id: 1,
      title: 'Lumina Classic Lens Camera',
      category: 'Electronics',
      price: 'NGN1,299.00',
      rating: 4.9,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDj7SyjdF9HgE2v4Z9xgU0F6APsBLW1NROPt4m0K7c9hBgpy4K09g6VX9SPBVD3bgHeYjADupVImq3f6Ph1sn7R7uW8rgAD7WkopJKHvw0FjYcB0XR1uSROf3P9XO-axrPTG3tWQ3RAAw5LDME3Znt0SLGCeRCfVprm8iUDsBzgky70N6UakUCJpy7RRxdA3_l-GRDi64GSC_Ik08QOx_H87yK6T52OZhj-YX_xdEFpwYb1avPJainN0lBpDcDJbBMl2FP0ZibYgg',
      alt: 'Lumina Classic Lens Camera',
    },
    {
      id: 2,
      title: 'Sonic Pro Noise Headphones',
      category: 'Audio',
      price: 'NGN599.00',
      rating: 4.8,
              image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAOFpjEQ-QXa1v_Vl12BHpKk_MCdAHJ36FQuGiwFx48ijAe_WC_qrd__iT8rPGlr3WYzxKzHGz-J8YPz1uJdG7Q8DVD5osu6kRCpn6f0yycmHG3P3A11qXSiUPi5ojLYCI9p2UI0aOvEz-rIRqtmgisQCwXHzWD6PzaKRxA_i0YG-LlMwMNYUoIE8DqjLVJ6EQsgo0vLwO0tES05lVEZPrYi4hg2sOleG23dDJWOcCY7xOKrVM1ZnGMftBxTK-IyQhVL-ZB425SEg',
      alt: 'Sonic Pro Noise Headphones',
    },
    {
      id: 3,
      title: 'Elegance White Leather Shoes',
      category: 'Fashion',
      price: 'NGN449.00',
      rating: 4.7,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-Erd6ZVipuUAGAxfkrgYGUF9P0n67FhTjD9C_Nummc4oyxYP1yHV2vpsZciB-LzqBPi65vXTnfP9lf5d5-YGZilFTPxvKI61QIVTsEUQ0H-WfsTkG1zHoqoyNYfn1MbSa2xwk2tHgPtL0qdUEszhkHKgmdhW7TLhqrZIUcefIJa3WsQblAPbzBerbht4iiydLb8HH-rLrAZGnPZIgFQ5czMOJHe864mWQHJ87P2yJyZ_kaeWHIFQE5HBTAuCvi0uEZwUBlXhJQ',
      alt: 'Elegance White Leather Shoes',
    },
    {
      id: 4,
      title: 'Zen Meditation Yoga Mat',
      category: 'Wellness',
      price: 'NGN299.00',
      rating: 4.6,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJNa3aPIy_-w5Av9qOg_vQWrraGXeqeWjUf1L2AE9BjfvakR8WvC_PqUOES7oiYs9vq0s8qpHKiAWVTva7Jd_74yAYKpM85DW2fJX_Du3_pK3vTVpKC-4urDwKxH9Sz9AKtrOiSZFKC6opOQe3C3LmcVemQZ2ZmdQSqrLbEnOICkY5FXc2flEaDCkfZFHTp8hiDHshF_OrChIV0gWdPuSxwPejTRCZnmaYxH7Z227SNzjyEqMq-kYmeraxtT4JCbrKtfrznpqdg',
      alt: 'Zen Meditation Yoga Mat',
    },
  ];




  export const features = [
  {
    icon: Truck,
    title: 'Global Shipping',
    description: 'Complimentary express shipping on all orders over NGN250. Tracked from our door to yours.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'We use military-grade 256-bit SSL encryption to ensure your transactions are always safe.',
  },
  {
    icon: Headphones,
    title: '24/7 Concierge',
    description: 'Our dedicated support team is available around the clock for any product or order inquiries.',
  },
];






export const ShopProducts: Product[] = [
  {
    id: '1',
    name: 'Linear Essence Watch',
    category: 'Brushed Steel & Leather',
    price: 245.0,
    images:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop',
    rating: 4.9,
    badge: 'NEW',
    badgeColor: 'bg-blue-600',
  },
  {
    id: '2',
    name: 'Obsidian Audio Gen-2',
    category: 'Noise Cancelling Wireless',
    price: 399.0,
    images:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Aero-V Velocity',
    category: 'High-Performance Knit',
    price: 129.0,
    originalPrice: 180.0,
    images:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    rating: 4.7,
    badge: 'SALE',
    badgeColor: 'bg-orange-600',
  },
  {
    id: '4',
    name: 'Retro-M 35mm',
    category: 'Limited Edition Classic',
    price: 850.0,
    images:
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
    rating: 5.0,
  },
  {
    id: '5',
    name: 'Nomad Leather Pack',
    category: 'Full-Grain Italian Leather',
    price: 320.0,
    images:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Prism Acetate Frames',
    category: 'Polarized UV400 Protection',
    price: 175.0,
    images:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    rating: 4.9,
  },
  {
    id: '7',
    name: 'Lumen Table Sphere',
    category: 'Smart Dimmable LED',
    price: 110.0,
    images:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Supima Essential Tee',
    category: 'Ethically Sourced Cotton',
    price: 55.0,
    images:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    rating: 4.8,
  },
]
