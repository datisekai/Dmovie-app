import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
