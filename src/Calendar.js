import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ todos }) => {
  const handleDateSelect = (selectInfo) => {
    const title = prompt("Görev adı girin:");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(`Görev "${clickInfo.event.title}" silinsin mi?`)
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    console.log(events);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={todos} // Todos listesi takvim olayları olarak aktarılıyor
      dateClick={handleDateSelect}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
    />
  );
};

export default Calendar;