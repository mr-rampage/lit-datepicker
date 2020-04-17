import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './day';
import { CalendarEvent } from '.';
import { getLanguage } from './utils';

export const month = (onMonthPicked: CalendarEvent) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
  const formatter = new Intl.DateTimeFormat(getLanguage(), { month: 'long' });
  return html`
    <button class=${classMap(classes)} @click=${(e: Event) => onMonthPicked(e, lastMonth)}>${formatter.format(lastMonth)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${(e: Event) => onMonthPicked(e, nextMonth)}>${formatter.format(nextMonth)}</button>
  `;
}
