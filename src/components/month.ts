import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './calendar';

export const month = (onMonthPicked: CalendarEvent) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const formatter = new Intl.DateTimeFormat(getLanguage(), { month: 'long' });
  return html`
    <button class=${classMap(classes)} @click=${(e: Event) => onMonthPicked(e, lastMonth)}>${formatter.format(lastMonth)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${(e: Event) => onMonthPicked(e, nextMonth)}>${formatter.format(nextMonth)}</button>
  `;
}

export type CalendarEvent = (e: Event, date: Date) => void;
export const getLanguage = (): string => window.navigator.languages ? window.navigator.languages[0] : window.navigator['userLanguage'] || window.navigator.language;