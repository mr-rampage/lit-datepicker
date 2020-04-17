import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { day } from './day';
import { month } from './month';
import { year } from './year';
import { calendar as getDates, groupByWeek } from '../lib/calendar';
import { CalendarEvents } from '.';
import { isSame } from './utils';

const dateClasses = {
  'uk-button': true,
  'uk-button-default': true,
  'uk-padding-remove-horizontal': true
};

const gridClasses = {
  'uk-grid-small': true,
  'uk-child-width-expand': true,
  'uk-grid-row-collapse': true,
  'uk-grid-column-collapse': true
}

export const calendar = (events: CalendarEvents) => {
  const dayPicker = day(events.onDaySelected)
  const monthPicker = month(events.onMonthChanged);
  const yearPicker = year(events.onYearChanged);

  return (currentDate: Date = new Date(), selectedDate: Date = new Date()) => {
    const dates = getDates(currentDate);
    const getDayClasses = dayClasses(currentDate, selectedDate, dateClasses);

    return html`
      <div class="uk-container">
        <div class=${classMap(gridClasses)} data-uk-grid>${yearPicker({ date: currentDate, classes: dateClasses })}</div>
        <div class=${classMap(gridClasses)} data-uk-grid>${monthPicker({ date: currentDate, classes: dateClasses })}</div>
        ${groupByWeek(dates).map(
            days => html`
              <div class=${classMap(gridClasses)} data-uk-grid>
                ${days.map(day => dayPicker({date: day, classes: getDayClasses(day)}))}
              </div>`
        )}
      </div>`
  };
}

function dayClasses(currentDate: Date, selectedDate: Date, dateClasses: any) {
  return (day: Date) => {
    return ({
      'uk-button-primary': isSame(day, selectedDate), 
      'uk-button-secondary': day.getMonth() !== currentDate.getMonth() && !isSame(day, selectedDate) && !isSame(day, new Date()),
      'uk-button-danger': isSame(day, new Date()) && !isSame(new Date(), selectedDate),
      ...dateClasses
    })
  }
}