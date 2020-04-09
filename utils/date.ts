import { format, parseISO } from "date-fns";

const IsoToStr = (date: string) => format(parseISO(date), "d LLL, yyyy");

export const DateUtils = {
  IsoToStr,
};
