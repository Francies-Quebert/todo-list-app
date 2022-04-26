import { configureStore } from "@reduxjs/toolkit";
import reducers from "../store";

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
