// src/utils/dateUtils.js
import { parseISO, format } from "date-fns";

export const formatISODate = (isoDate) => {
  const date = parseISO(isoDate);
  return format(date, "dd MM yyyy HH:mm:ss");
};
