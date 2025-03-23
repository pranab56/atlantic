import { baseApi } from "../../utils/apiBaseQuery";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params = {}) => {
        // Construct the query string with params
        const { page = 1, limit = 10, categoryId, subCategoryId } = params;
        let queryString = `/product?page=${page}&limit=${limit}`;
        
        // Add optional filter parameters if they exist
        if (categoryId) queryString += `&categoryId=${categoryId}`;
        if (subCategoryId) queryString += `&subCategoryId=${subCategoryId}`;
        
        return queryString;
      },
      providesTags: ["product"],
    }),
    category: builder.query({
      query: () => "/category",
      providesTags: ["product"],
    }),
      subCategory: builder.query({
      query: (id) => `/sub-category/${id}`,
      providesTags: ["product"],
    }),
    productDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["product"],
    }),
    allBrand: builder.query({
      query: () => "/brand",
      providesTags: ["product"],
    }),

    Inquiry: builder.mutation({
      query: (inquiryData) => ({
        url: "/inquiry",
        method: "POST",
        body: inquiryData,
      }),
      invalidatesTags: ["product"],
    }),


  }),
});

export const {  useGetAllProductsQuery , useCategoryQuery , useSubCategoryQuery , useProductDetailsQuery , useAllBrandQuery , useInquiryMutation } = productApi;
