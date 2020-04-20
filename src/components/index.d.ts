export type CalendarEvent = (date: Date) => void;

export type CalendarEvents = {
  onDaySelected: CalendarEvent,
  onMonthChanged: CalendarEvent,
  onYearChanged: CalendarEvent
}

export type InputProps = {
  value: Date;
}

export type CalendarProps = InputProps & { month: Date };