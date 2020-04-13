import config from "../config";

typeof window === "undefined" && require("now-logs")(config.NOWLOGS_SECRET);
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
