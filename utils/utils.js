import setHours from 'date-fns/setHours';
import add from 'date-fns/add';
import setMinutes from 'date-fns/setMinutes';
import Dates from './dates';

export const getAppointments = (date, data) => {
  const result = [];

  Dates.hours.forEach((d) => {
    const setDate = new Date(date);
    const setMinutesToDate = setMinutes(setDate, d.minutes);
    const setHoursToDate = setHours(setMinutesToDate, d.hour);

    const reservation = data.filter((x) => {
      const hour = add(new Date(x.date), { hours: 1 });
      return (
        setHoursToDate.getHours() === hour.getHours() &&
        setHoursToDate.getMinutes() === hour.getMinutes()
      );
    });

    result.push({
      date: setHoursToDate,
      isBooked: reservation.length === 1,
    });
  });

  return result;
};
