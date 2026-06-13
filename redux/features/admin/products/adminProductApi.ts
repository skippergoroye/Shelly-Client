import { apiSlice } from "../../api/apiSlice";

export interface ApiProduct {
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

export const adminProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiProduct[], void>({
      query: () => "/admin/products",
    }),
    createProduct: builder.mutation<ApiProduct, FormData>({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = adminProductApi;
