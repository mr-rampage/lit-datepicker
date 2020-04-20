import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { day as dayElement } from './day';
import { month as monthElement } from './month';
import { year as yearElement } from './year';
import { calendar as getDates, groupByWeek } from '../lib/calendar';
import { CalendarProps } from '.';
import { isSame, today } from './utils';

export type CalendarEventNames = {
  dateClicked: string,
  monthClicked: string,
  yearClicked: string
}

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

export const calendar = (events: CalendarEventNames) => {
  const dayPicker = dayElement(events.dateClicked);
  const monthPicker = monthElement(events.monthClicked);
  const yearPicker = yearElement(events.yearClicked);

  return ({month = new Date(), value = new Date()}: CalendarProps) => {
    const dates = getDates(month);
    const getDayClasses = dayClasses(month, value, dateClasses);

    return html`
      <div class="uk-container">
        <div class=${classMap(gridClasses)} data-uk-grid>${yearPicker({ date: month, classes: dateClasses })}</div>
        <div class=${classMap(gridClasses)} data-uk-grid>${monthPicker({ date: month, classes: dateClasses })}</div>
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
      'uk-button-danger': isSame(day, today()) && !isSame(today(), selectedDate),
      ...dateClasses
    })
  }
}