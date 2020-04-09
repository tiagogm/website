import { AppProps } from "next/app";
//nextjs requires global css to be requires in _app.tsx
import "highlight.js/styles/vs2015.css";

import "../styles/app.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
