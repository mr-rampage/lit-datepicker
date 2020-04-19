import { render, TemplateResult } from "lit-html";

export const getLanguage = (): string => window.navigator.languages ? window.navigator.languages[0] : window.navigator['userLanguage'] || window.navigator.language;

export function isSame(previous: Date, next: Date) {
  return previous !== null &&
    previous.getUTCFullYear() === next.getUTCFullYear() && 
    previous.getUTCMonth() === next.getUTCMonth() && 
    previous.getUTCDate() === next.getUTCDate();
}

export function replaceInputElement(source: HTMLInputElement) {
  const replacement = document.createElement('div');
  source.setAttribute('hidden', '');
  source.parentElement.insertBefore(replacement, source);
  return replacement;
}

export function synchronizeInput(source: HTMLInputElement, ...events: string[]) {
  return (value: string) => {
    if (source.value !== value) {
      source.value = value;
      events.forEach(event => source.dispatchEvent(new Event(event)));
    }
  }
}

export function pipe(...fns: Function[]) {
 return (x: any) => fns.reduce((v, f) => f(v), x); 
}

export function renderOnNext<S>(template: (state: S) => TemplateResult, target: HTMLElement, onNext: (newState: S, oldState: S) => void):
  (state: S) => Generator<S, void, Partial<S>> {
  function* store(oldState: S) {
    render(template(oldState), target);
    const nextState: S = {...oldState, ...(yield oldState)};
    onNext(nextState, oldState);
    yield* store(nextState);
  }

  return (state: S) => store(state);
}