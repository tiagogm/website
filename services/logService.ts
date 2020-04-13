import config from "../config";

const Sentry = typeof window !== "undefined" ? require("@sentry/browser") : require("@sentry/node");
Sentry.init({ dsn: config.SENTRY_DSN });

export const logService = {
  log: (...args: any[]) => {
    console.log(...args);
    Sentry.captureMessage(...args);
  },
  exception: (e: Error) => {
    console.error(e);
    Sentry.captureException(e);
  },
  //add more
};
