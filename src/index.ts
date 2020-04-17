import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { day } from './components/calendar';
import { calendar as getDates, groupByWeek } from './lib/calendar';
import { render } from 'lit-html';
import { month } from './components/month';
import { year } from './components/year';

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

const datePicker = (onDatePicked: (date: Date) => void, dates: Date[] = getDates(new Date())) => {
  const dateTemplate = day(onDatePicked);
  const monthPicker = month(console.log);
  const yearPicker = year(console.log);
  return html`
    <div class="uk-container">
      <div class=${classMap(gridClasses)} data-uk-grid>${yearPicker({ date: dates[15], classes: dateClasses })}</div>
      <div class=${classMap(gridClasses)} data-uk-grid>${monthPicker({ date: dates[15], classes: dateClasses })}</div>
      ${groupByWeek(dates).map(
          days => html`
            <div class=${classMap(gridClasses)} data-uk-grid>
              ${days.map(day => dateTemplate({date: day, classes: dateClasses}))}
            </div>`
      )}
    </div>`
};


render(datePicker(console.log, getDates(new Date(Date.UTC(1984, 7, 15)))), document.body);