import { configureStore, createAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

import { api } from "./api";
import { counterSlice } from "./features/counter/counterSlice";
import { listenerMiddleware } from "./middleware";

export const makeStore = (context: Context) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [counterSlice.name]: counterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          // https://github.com/reduxjs/redux-toolkit/issues/2228#issuecomment-1095409011
          extraArgument: context,
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat([api.middleware]),
    devTools: process.env.NODE_ENV !== "production",
    // devTools: {
    //   maxAge: 200,
    // },
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const hydrateAction = createAction<AppState>(HYDRATE);

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: false,
});
