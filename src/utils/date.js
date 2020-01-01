const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

export const intervalToMs = (interval) => {
  switch (interval) {
    case 'week':
    default:
      return WEEK;
  }
};
