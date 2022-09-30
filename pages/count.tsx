import type { NextPage } from "next";
import Link from "next/link";

import Button from "components/atoms/Button";
import {
  counterActions,
  selectCount,
} from "store/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Count: NextPage = () => {
  const currentCount = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h1 className="text-xl">Home</h1>
      <div className="pt-4">
        <Link href="/">Home</Link> -{" "}
        <Link href="/count">Obligatory Counter Example</Link>
      </div>
      <div className="pt-4">Current Count:</div>
      <div>
        <span className="text-8xl">{currentCount}</span>
      </div>
      <div className="flex gap-3 pt-4">
        <Button
          onClick={() => {
            dispatch(counterActions.incCount(1));
          }}
        >
          Inc by 1
        </Button>
        <Button
          onClick={() => {
            dispatch(counterActions.decCount(1));
          }}
        >
          Dec by 1
        </Button>
        <Button
          onClick={() => {
            dispatch(counterActions.setCount(0));
          }}
        >
          Reset to 0
        </Button>
      </div>
    </div>
  );
};

export default Count;
