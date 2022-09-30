import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { NextPageContext } from "next";
import { Context } from "next-redux-wrapper";
import Router from "next/router";
import nookies from "nookies";

import { API_HOST } from "./globals";

const DEFAULT_OPTIONS = {
  baseURL: `${API_HOST}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export type SystemError = {
  status?: number;
  data: unknown;
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, SystemError> =>
  async (
    { url, method, data, params },
    api: BaseQueryApi & { extra: Context }
  ) => {
    const instance = axios.create(DEFAULT_OPTIONS);

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers = config.headers ?? {};

      const { token } = nookies.get(api.extra as NextPageContext);

      if (token) {
        config.headers.Authorization = token;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error: Error | AxiosError): Promise<unknown> | void => {
        if (axios.isAxiosError(error)) {
          const status = error?.response?.status;
          const { token } = nookies.get(api.extra as NextPageContext);

          if (status === 401 && token) {
            nookies.destroy(api.extra as NextPageContext, "token");
            Router.push("/");
          } else {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    try {
      const result = await instance({
        url: url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
