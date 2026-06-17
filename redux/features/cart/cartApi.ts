import { apiSlice } from "../api/apiSlice";

export interface PublicApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sizes: number[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export const cartApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Product"] })
  .injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PublicApiProduct[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<PublicApiProduct, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
   overrideExisting: false
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = cartApi;
