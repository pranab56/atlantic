
import { productApi } from "../features/Products/productsApi.js";
import { configureStore } from "@reduxjs/toolkit";

const apis = [productApi];

const apiReducers = apis.length
  ? Object.fromEntries(apis.map((api) => [api.reducerPath, api.reducer]))
  : {};

export const store = configureStore({
  reducer: { ...apiReducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.flatMap((api) => api.middleware)),
});
