import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './day';
import { CalendarEvent } from '.';
import { getLanguage } from './utils';

export const year = (onYearPicked: CalendarEvent) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastYear = new Date(date.getFullYear() - 1, date.getMonth());
  const nextYear = new Date(date.getFullYear() + 1, date.getMonth());
  const formatter = new Intl.DateTimeFormat(getLanguage(), { year: 'numeric' });
  return html`
    <button class=${classMap(classes)} @click=${(e: Event) => onYearPicked(e, lastYear)}>${formatter.format(lastYear)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${(e: Event) => onYearPicked(e, nextYear)}>${formatter.format(nextYear)}</button>
  `;
}