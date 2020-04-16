export const calendar = (date: Date): Date[] => recurseUntil(isEndOfCalendar(date), sundayOfWeek(firstOfMonth(date)));

export const groupByWeek = (calendar: Date[]): Date[][] => calendar.reduce((weeks, date, index) => {
    if (index % 7 === 0) {
      weeks.push([])
    }
    weeks[Math.floor(index / 7)].push(date);
    return weeks;
  }, []);

const recurseUntil = (done: (date: Date) => boolean, startDate: Date, ...previousDates: Date[]): Date[] => 
  done(startDate) ? previousDates : recurseUntil(done, tomorrow(startDate), ...previousDates, startDate);

const isEndOfCalendar = (targetDate: Date) => (date: Date) =>
  isSunday(date) && date.getUTCMonth() !== targetDate.getUTCMonth() && date > targetDate;

const isSunday = (date: Date) => date.getUTCDay() === 0;

const firstOfMonth = (date: Date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
const sundayOfWeek = (date: Date) => addDays(-date.getUTCDay(), date);
const tomorrow = (date: Date) => addDays(1, date);

const addDays = (days: number, date: Date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days);