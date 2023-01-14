import "../styles/globals.css";

import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { wrapper } from "store";

const nextFont = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--next-font",
});

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <div className={`${nextFont.variable} font-sans`}>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </div>
  );
};

export default MyApp;
