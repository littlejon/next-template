import "@testing-library/jest-dom/extend-expect";
import { server } from "store/__mocks__/server";

Element.prototype.scrollTo = jest.fn();
Storage.prototype.getItem = jest.fn();
Storage.prototype.setItem = jest.fn();
Storage.prototype.removeItem = jest.fn();

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (...props: unknown[]) => {
    const dynamicModule = jest.requireActual("next/dynamic");
    const dynamicActualComp = dynamicModule.default;
    const RequiredComponent = dynamicActualComp(props[0]);
    RequiredComponent.preload
      ? RequiredComponent.preload()
      : RequiredComponent.render.preload();
    return RequiredComponent;
  },
}));

jest.mock("next/router", () => ({
  push: jest.fn(),
  replace: jest.fn(),
  useRouter: jest.fn(() => ({
    query: {},
    asPath: "/",
    pathname: "/",
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  })),
}));

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
