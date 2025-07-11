import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookFormData, IBook, Inputs } from "../../types/Alltypes";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_baseURL}`,
});

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    createBook: builder.mutation<any, Inputs>({
      query: (data) => ({
        url: "/books/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    getBooks: builder.query<{ result: IBook }, string>({
      query: () => ({
        url: "/books/",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    getBookById: builder.query<{ result: IBook }, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    updateBook: builder.mutation<any, {id: string, updatedData: Partial<BookFormData>}>({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteABook: builder.mutation<any, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteABookMutation,
} = bookApi;
