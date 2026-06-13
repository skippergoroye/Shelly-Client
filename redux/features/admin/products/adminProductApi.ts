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
    getProductById: builder.query<ApiProduct, string>({
      query: (id) => `/admin/products/${id}`,
    }),
    createProduct: builder.mutation<ApiProduct, FormData>({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
    }),
    updateProduct: builder.mutation<ApiProduct, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/products/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
