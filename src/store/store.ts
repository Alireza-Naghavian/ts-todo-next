import TodoSlice from "@/todoSlices/TodoSlice";
import { configureStore } from "@reduxjs/toolkit";

 const store = configureStore({
  reducer: {
    TodoSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store