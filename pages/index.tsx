import type { NextPage } from "next";
import Link from "next/link";

import { useGetGetQuery } from "store/features/httpbin/apiSlice";

const Home: NextPage = () => {
  const { data, isLoading } = useGetGetQuery();

  return (
    <div className="p-4">
      <h1 className="text-xl">Home</h1>
      <div className="pt-4">
        <Link href="/">Home</Link> -{" "}
        <Link href="/count">Obligatory Counter Example</Link>
      </div>
      {isLoading && <div className="pt-4">Loading...</div>}
      <div className="pt-4">
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default Home;
