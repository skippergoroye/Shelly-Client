import { apiSlice } from "../../api/apiSlice";

export interface CreateProductResponse {
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
    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = adminProductApi;
