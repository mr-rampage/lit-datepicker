import { html } from 'lit-html';
import { day } from './components/calendar';
import { calendar as getDates, groupByWeek } from './lib/calendar';
import { render } from 'lit-html';

const dateClasses = {
  'uk-button': true,
  'uk-button-default': true,
  'uk-padding-remove-horizontal': true
};

const datePicker = (onDatePicked: (date: Date) => void, dates: Date[] = getDates(new Date())) => {
  const dateTemplate = day(onDatePicked);
  return html`
    <div class="uk-container">
      ${groupByWeek(dates).map(
          days => html`
            <div class="uk-grid-small uk-child-width-expand uk-grid-row-collapse uk-grid-column-collapse uk-text-center" data-uk-grid>
              ${days.map(day => dateTemplate({date: day, classes: dateClasses}))}
            </div>`
      )}
    </div>`
};


render(datePicker(console.log, getDates(new Date(Date.UTC(1984, 7, 15)))), document.body);