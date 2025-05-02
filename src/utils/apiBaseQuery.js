import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "./BaseURL";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}/api/v1`,
  }),
  endpoints: () => ({}),
  tagTypes: ["product"],
});
