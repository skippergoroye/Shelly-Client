import { RootState } from "@/redux/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, {getState}) => {

      // const token = (getState() as RootState).auth?.token;
      //  console.log("User token", token)

      // Set the Authorization header if token exists
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }

      return headers;
    },

  }),
  tagTypes: [],
  // tagTypes: ["Product", "Category", "User", "Order"],
  endpoints: () => ({}),
});
