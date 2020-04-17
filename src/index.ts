import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { day } from './components/calendar';
import { calendar as getDates, groupByWeek } from './lib/calendar';
import { render } from 'lit-html';
import { month, CalendarEvent, getLanguage } from './components/month';
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


type CalendarEvents = {
  day: CalendarEvent,
  month: CalendarEvent,
  year: CalendarEvent
}

const datePicker = (events: CalendarEvents) => {
  const dayPicker = day(events.day)
  const monthPicker = month(events.month);
  const yearPicker = year(events.year);

  return (currentDate: Date = new Date()) => {
    const dates = getDates(currentDate);

    return html`
      <div class="uk-container">
        <div class=${classMap(gridClasses)} data-uk-grid>${yearPicker({ date: currentDate, classes: dateClasses })}</div>
        <div class=${classMap(gridClasses)} data-uk-grid>${monthPicker({ date: currentDate, classes: dateClasses })}</div>
        ${groupByWeek(dates).map(
            days => html`
              <div class=${classMap(gridClasses)} data-uk-grid>
                ${days.map(day => dayPicker({date: day, classes: dateClasses}))}
              </div>`
        )}
      </div>`
  };
}

const dateElement = (input: HTMLInputElement, value: Date = new Date()) => {
  function useInput(element: HTMLInputElement) {
    const wrapper = document.createElement('div');
    element.setAttribute('hidden', '');
    element.parentElement.insertBefore(wrapper, element);
    return wrapper;
  }

  function redraw(target: HTMLElement): CalendarEvent {
    return (e: Event, date: Date) => {
      e.stopPropagation();
      render(calendarTemplate(date), target);
    }
  }

  function getDateFormatter() {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Intl.DateTimeFormat(getLanguage(), options);
  }

  function setValue(element: HTMLInputElement): CalendarEvent {
    return (e, date) => {
      e.stopPropagation();
      element.value = getDateFormatter().format(date);
      element.dispatchEvent(new Event('change'));
      element.dispatchEvent(new Event('input'));
    }
  }

  const target = useInput(input);

  const eventHandlers: CalendarEvents = {
    day: setValue(input),
    month: redraw(target),
    year: redraw(target)
  };

  const calendarTemplate = datePicker(eventHandlers);
  render(calendarTemplate(value), target);
}

dateElement(document.querySelector('[type=date]'));