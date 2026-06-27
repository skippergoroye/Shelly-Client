import { useMemo } from 'react';
import { useGetProductsQuery } from '@/redux/features/cart/cartApi';
import { transformProducts } from '@/lib/helpers';

export const useTrendingProducts = () => {
  const { data } = useGetProductsQuery();

  const transformedProducts = useMemo(() => {
    return transformProducts(data || []);
  }, [data]);

  return { transformedProducts };
};
