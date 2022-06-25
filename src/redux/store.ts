import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
