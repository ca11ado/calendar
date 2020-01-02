const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

export const intervalToMs = (interval) => {
  switch (interval) {
    case 'month':
      return WEEK*4;
    case 'week':
    default:
      return WEEK;
  }
};

export const isStepAllowed = step =>
  ['none', 'year', 'month', 'week', 'day',].includes(step);
