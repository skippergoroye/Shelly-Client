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

export const adminProductApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Product"] })
  .injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<ApiProduct[], void>({
      query: () => "/admin/products",
      providesTags: ["Product"],
    }),
    getAdminProductById: builder.query<ApiProduct, string>({
      query: (id) => `/admin/products/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<ApiProduct, FormData>({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<ApiProduct, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/products/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAdminProductsQuery,
  useGetAdminProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
