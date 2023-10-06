import { formatDistance } from "date-fns";

export const calculateTimeSince = (date) => {
  const now = new Date();
  const timeSince = formatDistance(new Date(date), now, { addSuffix: true });
  return timeSince;
};
