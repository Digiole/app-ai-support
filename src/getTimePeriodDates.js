import { DateTime, Duration } from 'luxon';
//const { DateTime, Duration } = require('luxon');

function getISODate(date) {
  return date.toISODate();
}

export function getTimePeriodDates(defaultDate) {

  //const current_date = DateTime.local(2023, 7, 1);  // Replace with your desired current date
  const current_date = DateTime.local(defaultDate.split("-"));  //iso8601 date format
  const yesterday = current_date.minus({ days: 1 });
  const today = current_date;
  const tomorrow = current_date.plus({ days: 1 });
  const last_night = yesterday;
  const this_morning = today;

  const start_of_current_week = current_date.startOf('week');
  const end_of_current_week = current_date.endOf('week');
  const start_of_previous_week = start_of_current_week.minus({ weeks: 1 });
  const end_of_previous_week = start_of_previous_week.plus({ days: 6 });
  const this_week = `${getISODate(start_of_current_week)} - ${getISODate(end_of_current_week)}`;
  const last_week = `${getISODate(start_of_previous_week)} - ${getISODate(end_of_previous_week)}`;

  const last_saturday = end_of_current_week.minus({ days: 1 });
  const last_sunday = end_of_current_week;
  const this_saturday = start_of_current_week.plus({ days: 5 });
  const this_sunday = start_of_current_week.plus({ days: 6 });
  const next_monday = start_of_current_week.plus({ weeks: 1 });
  const next_saturday = next_monday.plus({ days: 5 });
  const next_sunday = next_monday.plus({ days: 6 });
  const next_week = `${getISODate(next_monday)} - ${getISODate(next_sunday)}`;

  const first_day_of_month = current_date.startOf('month');
  const last_day_of_month = current_date.endOf('month');
  const this_month = `${getISODate(first_day_of_month)} - ${getISODate(last_day_of_month)}`;

  const first_day_of_last_month = current_date.minus({ months: 1 }).startOf('month');
  const last_day_of_last_month = current_date.minus({ months: 1 }).endOf('month');
  const last_month = `${getISODate(first_day_of_last_month)} - ${getISODate(last_day_of_last_month)}`;

  const first_day_of_next_month = current_date.plus({ months: 1 }).startOf('month');
  const last_day_of_next_month = current_date.plus({ months: 1 }).endOf('month');
  const next_month = `${getISODate(first_day_of_next_month)} - ${getISODate(last_day_of_next_month)}`;

  const first_day_of_year = current_date.startOf('year');
  const last_day_of_year = current_date.endOf('year');
  const this_year = `${getISODate(first_day_of_year)} - ${getISODate(last_day_of_year)}`;

  const first_day_of_last_year = current_date.minus({ years: 1 }).startOf('year');
  const last_day_of_last_year = current_date.minus({ years: 1 }).endOf('year');
  const last_year = `${getISODate(first_day_of_last_year)} - ${getISODate(last_day_of_last_year)}`;

  const first_day_of_next_year = current_date.plus({ years: 1 }).startOf('year');
  const last_day_of_next_year = current_date.plus({ years: 1 }).endOf('year');
  const next_year = `${getISODate(first_day_of_next_year)} - ${getISODate(last_day_of_next_year)}`;

  const first_quarter_start = current_date.startOf('year').startOf('quarter');
  const first_quarter_end = current_date.startOf('year').endOf('quarter');
  const second_quarter_start = current_date.startOf('year').plus({ months: 3 }).startOf('quarter');
  const second_quarter_end = current_date.startOf('year').plus({ months: 3 }).endOf('quarter');
  const third_quarter_start = current_date.startOf('year').plus({ months: 6 }).startOf('quarter');
  const third_quarter_end = current_date.startOf('year').plus({ months: 6 }).endOf('quarter');
  const fourth_quarter_start = current_date.startOf('year').plus({ months: 9 }).startOf('quarter');
  const fourth_quarter_end = current_date.startOf('year').plus({ months: 9 }).endOf('quarter');

  const dates = {
    yesterday: getISODate(yesterday),
    today: getISODate(today),
    tomorrow: getISODate(tomorrow),
    'last night': getISODate(last_night),
    'previous night': getISODate(last_night),
    'this morning': getISODate(this_morning),
    'last week': last_week,
    'previous week': last_week,
    'this week': this_week,
    'next week': next_week,
    'this month': this_month,
    'last month': last_month,
    'previous month': last_month,
    'next month': next_month,
    'next year': next_year,
    'this year': this_year,
    'last year': last_year,
    'previous year': last_year,
    'last weekend': `${getISODate(last_saturday)} - ${getISODate(last_sunday)}`,
    'previous weekend': `${getISODate(last_saturday)} - ${getISODate(last_sunday)}`,
    'this weekend': `${getISODate(this_saturday)} - ${getISODate(this_sunday)}`,
    'next weekend': `${getISODate(next_saturday)} - ${getISODate(next_sunday)}`,
    'first quarter': `${getISODate(first_quarter_start)} - ${getISODate(first_quarter_end)}`,
    'second quarter': `${getISODate(second_quarter_start)} - ${getISODate(second_quarter_end)}`,
    'third quarter': `${getISODate(third_quarter_start)} - ${getISODate(third_quarter_end)}`,
    'fourth quarter': `${getISODate(fourth_quarter_start)} - ${getISODate(fourth_quarter_end)}`
  };



  const currentWeekday = current_date.toFormat('EEEE').toLowerCase();
  for (let i = 1; i <= 7; i++) {
    const weekday = current_date.minus({ days: i });
    const weekdayLower = weekday.toFormat('EEEE').toLowerCase();
    dates[`last ${weekdayLower}`] = getISODate(weekday);
    dates[`previous ${weekdayLower}`] = getISODate(weekday);

    const currentWeekdayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(weekdayLower);

    // this refers to the same week, what is the current date.. 
    dates[`this ${weekdayLower}`] = getISODate(start_of_current_week.plus({ days: currentWeekdayIndex }));

  }


  return dates;
}

const Dates = getTimePeriodDates(new Date().toISOString());
export default Dates;

/* 
// Example usage:
const current_date = DateTime.local(2023, 7, 1);  // Replace with your desired current date
const result = get_time_period_dates(current_date);
for (const term in result) {
  console.log(`${term}: ${result[term]}`);
}
 */
/* 
module.exports = {
  getTimePeriodDates
}; */