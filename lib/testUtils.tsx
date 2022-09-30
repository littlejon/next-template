import { ReactNode } from "react";

import { render, RenderOptions } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import { Provider } from "react-redux";

import { makeStore } from "store";

export const getWrapper =
  (store = makeStore({})) =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children?: ReactNode }) =>
    <Provider store={store}>{children}</Provider>;

const customRender = (
  component: ReactNode,
  options?: RenderOptions,
  store = makeStore({})
) => {
  const ui = <Provider store={store}>{component}</Provider>;

  return render(ui, options);
};

export function mockWindowLocation() {
  const savedLocation = window.location;

  const locationMock: Location = {
    ...mock<Location>(),
    assign: jest.fn(),
  };

  beforeEach(() => {
    delete (window as Partial<typeof window>).location;

    window.location = locationMock;
  });

  afterEach(() => {
    window.location = savedLocation;
  });

  return locationMock;
}

export function mockWindowConfirm() {
  const savedConfirm = window.confirm;

  const confirmMock = jest.fn();

  beforeEach(() => {
    delete (window as Partial<typeof window>).confirm;

    window.confirm = confirmMock;
  });

  afterEach(() => {
    window.confirm = savedConfirm;
  });

  return confirmMock;
}

export function mockWindowAddEventListener() {
  const savedAddEventListener = window.addEventListener;

  const addEventListenerMock = jest.fn();

  beforeEach(() => {
    delete (window as Partial<typeof window>).addEventListener;

    window.addEventListener = addEventListenerMock;
  });

  afterEach(() => {
    window.addEventListener = savedAddEventListener;
  });

  return addEventListenerMock;
}

export const getMockCallByCalledWith = (
  mocked: jest.Mock,
  predicate: (value: unknown) => boolean
) => {
  return mocked.mock.calls.find(predicate);
};

export * from "@testing-library/react";
export { customRender as render };
