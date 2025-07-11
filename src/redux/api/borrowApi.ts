import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./bookApi";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: baseQuery,
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    createBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrow/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),
    borrowSummary: builder.query({
      query: () => `/borrow/`,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useBorrowSummaryQuery } = borrowApi;
