import { api } from "store/api";

export const httpbinSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGet: builder.query<Record<string, string | string[]>, void>({
      query: () => ({
        url: `/get`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGetQuery } = httpbinSlice;

export const { getGet } = httpbinSlice.endpoints;
