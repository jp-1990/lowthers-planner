export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
];

export const monthsAbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const daysAbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const currentDate = () => {
  let today = Date.now();
  if (new Date(today).getDay() === 0) {
    today += 1000 * 60 * 60 * 24;
  }
  today = new Date(today);
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
    day: today.getDay(),
  };
};

// add appropriate suffix to date
export const suffix = (el) => {
  if (el === 1 || el === 21 || el === 31) {
    return 'st';
  } else if (el === 2 || el === 22) {
    return 'nd';
  } else if (el === 3 || el === 23) {
    return 'rd';
  } else {
    return 'th';
  }
};

// get days in props.month
export const daysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// get date from string
export const dateFromString = (date) => {
  return new Date(
    date.split('/')[2],
    date.split('/')[1] - 1,
    date.split('/')[0]
  );
};

// date +1/-1 day
export const incrementDay = (dateString, operator) => {
  // add/subtract one day from given date
  let date = dateFromString(dateString);
  const operators = {
    '+': () => {
      return new Date(date.valueOf() + 1000 * 3600 * 24);
    },
    '-': () => {
      return new Date(date.valueOf() - 1000 * 3600 * 24);
    },
  };
  // use provided operator to return new date value
  date = operators[operator]();
  // if sunday, increment again
  if (date.getDay() === 0) date = operators[operator]();

  return date.toLocaleDateString();
};

// handle case where week spans two months
export const monthOverflowCheck = (el, month, year) => {
  if (el > daysInMonth(year, month)) {
    const newDay = el - daysInMonth(year, month);
    return {
      month: month + 1,
      date: newDay,
    };
  } else {
    return {
      month: month,
      date: el,
    };
  }
};
