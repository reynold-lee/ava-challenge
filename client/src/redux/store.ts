import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import conversationReducer from "./reducers/conversations";

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
