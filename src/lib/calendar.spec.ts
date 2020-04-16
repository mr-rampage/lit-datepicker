import * as test from 'tape';
import { assert, property, date } from 'fast-check';
import { calendar } from './calendar';

test("Calendar", ({ plan, doesNotThrow }: test.Test) => {
  plan(2);

  doesNotThrow(() =>
    assert(
      property(date(), (date: Date) => {
        const actual = calendar(date);
        return actual[0].getUTCDay() === 0 && actual[actual.length - 1].getUTCDay() === 6;
      })
    ), 'should always start on a Sunday and end on a Saturday');

  doesNotThrow(() =>
    assert(
      property(date(), (date: Date) => {
        const actual = calendar(date);
        const lastMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1)).getUTCMonth();
        const nextMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1)).getUTCMonth();

        return actual.every((day, index) => {
          const month = day.getUTCMonth();
          const withinMonthRange = month === date.getUTCMonth() || month === lastMonth || month === nextMonth;
          const isConsecutive = index ? day > actual[index - 1] : true;
          return withinMonthRange && isConsecutive;
        })
      })
    ), 'should always contain consecutive days within last month and next month');
});

test("today", ({ plan, doesNotThrow }) => {
  plan(1);
  doesNotThrow(() => calendar(new Date()));
})