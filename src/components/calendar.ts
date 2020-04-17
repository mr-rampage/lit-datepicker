import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

export type DateProps = {
  date: Date,
  classes?: any,
};

export const day = (onDatePicked: (date: Date) => void) => ({date, classes = {}}: DateProps) => html`
    <button class=${classMap(classes)} @click=${() => onDatePicked(date)}>${date.getDate()}</button>
  `;