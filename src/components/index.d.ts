export type CalendarEvent = (e: Event, date: Date) => void;

export type CalendarEvents = {
  onDaySelected: CalendarEvent,
  onMonthChanged: CalendarEvent,
  onYearChanged: CalendarEvent
}
