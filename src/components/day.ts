import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { dispatch } from './utils';

export type DateProps = {
  date: Date,
  classes?: any,
};

export const day = (eventName: string) => ({date, classes = {}}: DateProps) => html`
    <button class=${classMap(classes)} @click=${dispatch(eventName, date)}>${date.getDate()}</button>
  `;
