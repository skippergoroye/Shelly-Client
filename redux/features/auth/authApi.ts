import { apiSlice } from "../api/apiSlice";

export interface AdminLoginResponse {
  accessToken: string;
  admin: {
    id: string;
    email: string;
  };
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
} = authApi;
