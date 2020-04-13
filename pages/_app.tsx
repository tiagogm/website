import App, { AppProps } from "next/app";
import { logService } from "../services/logService";

//nextjs requires global css to be requires in _app.tsx
import "highlight.js/styles/vs2015.css";
import "../styles/app.scss";

class MyApp extends App<AppProps> {
  render() {
    const { pageProps, Component } = this.props;
    return <Component {...pageProps} />;
  }

  // Standard React extension point for capturing errors.
  componentDidCatch(error, errorInfo) {
    logService.exception(error);
    super.componentDidCatch(error, errorInfo);
  }
}

export default MyApp;
