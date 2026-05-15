import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        limit = 10,
        skip = 0,
      }: { limit?: number; skip?: number } = {}) => ({
        url: "/products",
        params: { limit, skip },
      }),
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    searchProducts: builder.query({
      query: (q = "") => ({
        url: "/products/search",
        params: { q },
      }),
    }),


    getCategories: builder.query({
      query: () => "/products/categories",
    }),

    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = cartApi;
