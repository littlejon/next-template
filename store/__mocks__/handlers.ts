import { rest } from "msw";

import { API_HOST } from "lib/globals";

export const handlers = [
  rest.get(`${API_HOST}/get`, (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
];
