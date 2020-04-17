import { render } from 'lit-html';
import { CalendarEvent } from './components';
import { getLanguage, isSame } from './components/utils';
import { calendar } from './components/uikit-calendar';

main();

function replaceInputs(input: HTMLInputElement) {
  const target = useInput(input);
  let value = input.valueAsDate || new Date();

  const calendarTemplate = calendar({
    onDaySelected: (e: Event, date: Date) => { value = date; setValue(input)(e, date); redraw(target)(e, date); },
    onMonthChanged: redraw(target),
    onYearChanged: redraw(target)
  });

  render(calendarTemplate(value, value), target);

  function redraw(target: HTMLElement): CalendarEvent {
    return (e: Event, date: Date) => {
      e.stopPropagation();
      render(calendarTemplate(date, value), target);
    }
  }
}

function useInput(element: HTMLInputElement) {
  const wrapper = document.createElement('div');
  element.setAttribute('hidden', '');
  element.parentElement.insertBefore(wrapper, element);
  return wrapper;
}

function getDateFormatter() {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Intl.DateTimeFormat(getLanguage(), options);
}

function setValue(element: HTMLInputElement): CalendarEvent {
  return (e, date) => {
    e.stopPropagation();
    const previous = element.valueAsDate;
    const next = date;

    if (!isSame(previous, next)) {
      element.value = getDateFormatter().format(date);
      element.dispatchEvent(new Event('change'));
      element.dispatchEvent(new Event('input'));
    }
    
    return date;
  }
}

function main() {
  document.querySelectorAll('[type=date]')
    .forEach((input: HTMLInputElement) => replaceInputs(input))
}
