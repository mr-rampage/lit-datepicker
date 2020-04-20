import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './day';
import { getLanguage, dispatch } from './utils';

export const year = (eventName: string) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastYear = new Date(date.getFullYear() - 1, date.getMonth());
  const nextYear = new Date(date.getFullYear() + 1, date.getMonth());
  const formatter = new Intl.DateTimeFormat(getLanguage(), { year: 'numeric' });
  return html`
    <button class=${classMap(classes)} @click=${dispatch(eventName, lastYear)}>${formatter.format(lastYear)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${dispatch(eventName, nextYear)}>${formatter.format(nextYear)}</button>
  `;
}