import {html, nothing, TemplateResult} from 'lit-html';
import { calendar } from './uikit-calendar';
import { renderOnNext, dispatch } from './utils';
import { CalendarProps } from '.';

type DatePickerProps = {
  value: Date;
  month: Date;
  showCalendar: boolean;
}

const datePickerTemplate = (calendarTemplate: (props: CalendarProps) => TemplateResult) => {
  const dateFormatter = new Intl.DateTimeFormat();
  return ({ value, showCalendar, month}: DatePickerProps) => { 
    return html`
    <div class="uk-container">
      <output @click=${dispatch('toggle-calendar', !showCalendar)}>${dateFormatter.format(value)}</output>
      ${ showCalendar ? calendarTemplate({value, month}) : nothing}
    </div>`
  };
}

export const datePicker = (target: HTMLElement, value: Date, onDatePicked: (date: Date) => void) => {
  const calendarEvents = {
    dateClicked: 'uk-date-picked',
    monthClicked: 'uk-month-picked',
    yearClicked: 'uk-year-picked'
  }

  const calendarTemplate = calendar(calendarEvents);

  target.addEventListener(calendarEvents.dateClicked, (e: CustomEvent) => { onDatePicked(e.detail); draw.next({ value: e.detail })});
  target.addEventListener(calendarEvents.monthClicked, (e: CustomEvent) => draw.next({ month: e.detail }));
  target.addEventListener(calendarEvents.yearClicked, (e: CustomEvent) => draw.next({ month: e.detail }));
  target.addEventListener('toggle-calendar', (e: CustomEvent) => draw.next({ showCalendar: e.detail }))
  
  const template = datePickerTemplate(calendarTemplate);
  
  const draw = renderOnNext(template, target)({ 
    value: new Date(value.getTime()), 
    showCalendar: false,
    month: new Date(value.getTime())
  });
  draw.next();
}