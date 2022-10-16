import { ReactNode, useId } from "react";

import { DefaultProps } from "store/types";

export interface ButtonProps extends DefaultProps {
  onClick?: VoidFunction;
  children: ReactNode;
}

export default function Button({
  id = useId(),
  dataTestId,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      id={id}
      data-testid={dataTestId}
      className="rounded border border-gray-700 px-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
