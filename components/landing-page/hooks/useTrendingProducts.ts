import { useMemo } from 'react';
import { useGetProductsQuery } from '@/redux/features/cart/cartApi';
import { transformProducts } from '@/lib/helpers';

export const useTrendingProducts = () => {
    const { data } = useGetProductsQuery({ limit: 8, skip: 0 });

    const transformedProducts = useMemo(() => {
        return transformProducts(data?.products || []);
    }, [data]);

    return { transformedProducts };
};