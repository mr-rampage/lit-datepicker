import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { CalendarEvent } from '.';

export type DateProps = {
  date: Date,
  classes?: any,
};

export const day = (onDatePicked: CalendarEvent) => ({date, classes = {}}: DateProps) => html`
    <button class=${classMap(classes)} @click=${(e: Event) => onDatePicked(e, date)}>${date.getDate()}</button>
  `;