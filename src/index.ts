import { calendar } from './components/uikit-calendar';
import { getLanguage, replaceInputElement, synchronizeInput, renderOnNext, pipe } from './components/utils';
import { CalendarProps } from './components';

main();

function main() {
  document.querySelectorAll('[type=date]').forEach(datePicker);
}

function datePicker(input: HTMLInputElement) {
  const target = replaceInputElement(input);
  const template = calendar({
    onDaySelected: (e, date) => { e.stopPropagation(); draw.next({value: date}) },
    onMonthChanged: (e, date) => { e.stopPropagation(); draw.next({month: date}); },
    onYearChanged: (e, date) => { e.stopPropagation(); draw.next({month: date}); }
  });

  const synchronize = pipe(
    asInputValue,
    synchronizeInput(input, 'change', 'input')
  );

  const sync = (newState: CalendarProps) => synchronize(newState.value)

  const draw = renderOnNext(template, target, sync)({
    value: input.valueAsDate || new Date(),
    month: input.valueAsDate || new Date()
  });

  draw.next();
}

function asInputValue(date: Date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat(getLanguage(), options);
  return dateFormatter.format(date);
}