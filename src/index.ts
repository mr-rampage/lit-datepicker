import { render, TemplateResult } from 'lit-html';
import { CalendarProps, InputProps } from './components';
import { getLanguage, isSame } from './components/utils';
import { calendar } from './components/uikit-calendar';
import { StateSideEffectFactory, StateSideEffect } from './index.d';

main();

// General Purpose
function stateHandler<T extends object, K extends keyof T>(sideEffect: StateSideEffect<T>): ProxyHandler<T> {
  return {
    set(obj: T, prop: K, newValue: T[K]) {
      const oldValue = obj[prop];
      obj[prop] = newValue;
      if (sideEffect[prop]) {
        sideEffect[prop](oldValue, newValue);
      }
      return true;
    }
  }
}

function replaceInput<T extends InputProps>(input: HTMLInputElement, bind: (state: T) => (state: T) => TemplateResult, stateSideEffectFactory: StateSideEffectFactory<T>, initialState: T) {
  const target = useInput(input);
  const state = new Proxy(initialState, stateHandler(stateSideEffectFactory(input, draw)));
  const template = bind(state);

  draw();
  
  function draw() {
    render(template(state), target);
  }
}

function useInput(element: HTMLInputElement) {
  const wrapper = document.createElement('div');
  element.setAttribute('hidden', '');
  element.parentElement.insertBefore(wrapper, element);
  return wrapper;
}


// Component unique
function stateEffect(input: HTMLInputElement, redraw: () => void): StateSideEffect<CalendarProps> {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat(getLanguage(), options);

  return {
    value(oldValue, newValue) {
      if (!isSame(oldValue, newValue)) {
        input.value = dateFormatter.format(newValue);
        input.dispatchEvent(new Event('change'));
        input.dispatchEvent(new Event('input'));
        redraw();
      }
    },
    month() {
      redraw();
    }
}};

function datePicker(state: CalendarProps): (state: CalendarProps) => TemplateResult {
  return calendar({
    onDaySelected: (e, date) => { e.stopPropagation(); state.value = date; },
    onMonthChanged: (e, date) => { e.stopPropagation(); state.month = date; },
    onYearChanged: (e, date) => { e.stopPropagation(); state.month = date; }
  })
}

function main() {
  document.querySelectorAll('[type=date]')
    .forEach((input: HTMLInputElement) => {
      replaceInput(input, datePicker, stateEffect, { value: input.valueAsDate || new Date(), month: new Date()});
    })
}
