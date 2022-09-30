import { render, screen } from "lib/testUtils";

import Button from "../Button";

describe("Button", () => {
  it("Renders", () => {
    render(<Button dataTestId="button">Button</Button>);

    expect(screen.getByTestId("button")).toBeInTheDocument();
  });
});
