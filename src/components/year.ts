import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './calendar';
import { getLanguage } from './month';

export const year = (onYearPicked: (date: Date) => void) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastYear = new Date(date.getFullYear() - 1, date.getMonth(), 1);
  const nextYear = new Date(date.getFullYear() + 1, date.getMonth(), 1);
  const formatter = new Intl.DateTimeFormat(getLanguage(), { year: 'numeric' });
  return html`
    <button class=${classMap(classes)} @click=${() => onYearPicked(lastYear)}>${formatter.format(lastYear)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${() => onYearPicked(nextYear)}>${formatter.format(nextYear)}</button>
  `;
}