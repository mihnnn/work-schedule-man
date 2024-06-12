import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDates = [];

  //create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDates.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  //generate current dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDates.push({ 
        currentMonth: true, 
        date: firstDateOfMonth.date(i),
        today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
     });
  }

  const remaining = 42 - arrayOfDates.length;
  //create suffix date
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDates.push({ currentMonth: false, date: firstDateOfMonth.date(i) });
  }

  return arrayOfDates;
};
