import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { NextPageContext } from "next";
import Router from "next/router";
import nookies from "nookies";

import { API_HOST } from "./globals";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_HOST}`,
  prepareHeaders: (headers, api) => {
    const { token } = nookies.get(api.extra as NextPageContext);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithUnAuthHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { token } = nookies.get(api.extra as NextPageContext);

    if (token) {
      nookies.destroy(api.extra as NextPageContext, "token");
      Router.replace("/");
    }
  }

  return result;
};
