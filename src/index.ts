import { render, TemplateResult } from 'lit-html';
import { calendar } from './components/uikit-calendar';
import { getLanguage } from './components/utils';
import { CalendarProps } from './components';

main();

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

  const draw = makeRenderLoop(template, target, sync)({
    value: input.valueAsDate || new Date(),
    month: input.valueAsDate || new Date()
  });

  draw.next();
}

function main() {
  document.querySelectorAll('[type=date]').forEach(datePicker);
}

// Utility stuff...
function replaceInputElement(source: HTMLInputElement) {
  const replacement = document.createElement('div');
  source.setAttribute('hidden', '');
  source.parentElement.insertBefore(replacement, source);
  return replacement;
}

function synchronizeInput(source: HTMLInputElement, ...events: string[]) {
  return (value: string) => {
    if (source.value !== value) {
      source.value = value;
      events.forEach(event => source.dispatchEvent(new Event(event)));
    }
  }
}

function asInputValue(date: Date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat(getLanguage(), options);
  return dateFormatter.format(date);
}

function pipe(...fns: Function[]) {
 return (x: any) => fns.reduce((v, f) => f(v), x); 
}

function makeRenderLoop<S>(template: (state: S) => TemplateResult, target: HTMLElement, onNext: (newState: S, oldState: S) => void):
  (state: S) => Generator<CalendarProps, void, Partial<CalendarProps>> {
  function* store(oldState: S) {
    render(template(oldState), target);
    const nextState: S = {...oldState, ...(yield oldState)};
    onNext(nextState, oldState);
    yield* store(nextState);
  }

  return (state: S) => store(state);
}