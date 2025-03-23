// import { baseApi } from "@/utils/apiBaseQuery";

// export const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch all meals
//     getAllProducts: builder.query({
//       query: () => "/product",
//       providesTags: ["product"],
//     }),

//     // Fetch a meal by ID
//     getMealById: builder.query({
//       query: (id) => `/dashboard/get-meal/${id}`,
//       providesTags: ["product"],
//     }),

//     // Delete a meal by ID
//     deleteMeal: builder.mutation({
//       query: (id) => ({
//         url: `/dashboard/delete-meal/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["product"],
//     }),
//   }),
// });

// export const { useGetAllMealsQuery, useGetMealByIdQuery, useDeleteMealMutation } = productApi;
