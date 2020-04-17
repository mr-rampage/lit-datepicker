import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { DateProps } from './calendar';

export const month = (onMonthPicked: (date: Date) => void) => ({date, classes = {}}: DateProps): TemplateResult => {
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
  return html`
    <button class=${classMap(classes)} @click=${() => onMonthPicked(lastMonth)}>${formatter.format(lastMonth)}</button>
    <span class=${classMap(classes)}>${formatter.format(date)}</span>
    <button class=${classMap(classes)} @click=${() => onMonthPicked(nextMonth)}>${formatter.format(nextMonth)}</button>
  `;
}