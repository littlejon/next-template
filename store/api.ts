import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { baseQueryWithUnAuthHandler } from "lib/httpClient";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithUnAuthHandler,
  tagTypes: [],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
