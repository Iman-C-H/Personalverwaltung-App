import {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./Eventplan.css";

const localizer = momentLocalizer(moment);


function Eventplan() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
            const formattedEvents = savedEvents.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formattedEvents);
    }, []);

    // Event hinzufügen
    const handleSaveEvent = () => {
        if (newEvent.title && newEvent.start && newEvent.startTime &&  newEvent.end && newEvent.endTime) {

            const start = new Date(newEvent.start);
            const [startHours, startMinutes] = newEvent.startTime.split(":");
            start.setHours(parseInt(startHours), parseInt(startMinutes));

            const end = new Date(newEvent.end);
            const [endHours, endMinutes] = newEvent.endTime.split(":");
            end.setHours(parseInt(endHours), parseInt(endMinutes));

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                alert("Ungültiges Datum oder Uhrzeit!");
                return;
            }

            const updatedEvents = editingEvent
            ? events.map(event =>
                event === editingEvent
                    ? { ...event, title: newEvent.title, start, end }
                    : event
            )
            : [...events, { title: newEvent.title, start, end }];
            setEvents(updatedEvents);
            localStorage.setItem(`events`, JSON.stringify(updatedEvents));
            setNewEvent({ title: "", start: "", startTime: "", end: "", endTime: ""});
            setEditingEvent(null);
            setSelectedEvent(null);
        } else {
            alert("Bitte alle Felder ausfüllen!");
        }
    };
    // Event löschen
    const handleDeleteSelectedEvent = (eventToDelete) => {
        const confirmed = window.confirm(`Sind Sie sicher, dass das Event ${eventToDelete.title} aus dem System gelöscht werden soll?`);
            //const confirmed = window.confirm(`Sind Sie sicher, die Abwesenheit ${eventToDelete.title} aus dem System gelöscht werden soll?`);
            if (confirmed) {
                const updatedEvents = events.filter(event => 
                    event.title !== eventToDelete.title ||
                    event.start.getTime() !== eventToDelete.start.getTime() ||
                    event.end.getTime() !== eventToDelete.end.getTime()
        );  
        setEvents(updatedEvents);
        localStorage.setItem(`events`, JSON.stringify(updatedEvents));
        setSelectedEvent(null);
        } else {
            console.log("Abwesenheit wurde nicht gelöscht.")
        }
    };

    // Event bearbeiten
    const handleEditEvent = ( event )  => {
       setEditingEvent(event);
       setNewEvent({
        title: event.title,
        start: moment(event.start).format("YYYY-MM-DD"),
        end: moment(event.end).format("YYYY-MM-DD"),
        startTime: moment(event.start).format("HH:mm"),
        endTime: moment(event.end).format("HH:mm"),
       });
    };
        


    return (
        <div className="eventplan-container">
           <div className="eventplan-wrapper"
        style={{
          width: '80%',  // 80% der Bildschirmbreite
          maxWidth: '1200px',
          padding: '10px',
          borderRadius: '20px',
          backgroundColor: '#f4f4f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Schatten um den Kalender
        }}
       >
            <h2 className="eventplan-header" style={{ textAlign: 'center', marginBottom: '20px' }}>Unsere Events</h2>
            <div className="eventplan-form">
                    <input className="eventplan-input" type="text" placeholder="Titel" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
                    <label htmlFor="start-time" className="eventplan-label">Von: </label>
                    <input className="eventplan-input" type="date" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} />
                    <input className="eventplan-input" type="time" value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} />
                    <label htmlFor="start-time" className="eventplan-label">Bis: </label>
                    <input className="eventplan-input" type="date" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} />
                    <input className="eventplan-input" type="time" value={newEvent.endTime} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} />
                    <button className="eventplan-button" onClick={handleSaveEvent}>{editingEvent ? "Änderungen speichern": "Event hinzufügen"}</button>
                    {selectedEvent && (
                        <button className="eventplan-button-delete" onClick={() => handleDeleteSelectedEvent(selectedEvent)}>Event löschen</button>
                    )}
                </div>

            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500}}
            selectable
            onDoubleClickEvent={handleEditEvent}
            onSelectEvent={(event) => setSelectedEvent(event)}
            views={["month", "week", "day"]}
            step={60}
            min={new Date(2024, 0, 1, 9, 0)}
            max={new Date(2024, 0, 1, 18, 0)}
            timeslots={2}
            />
        </div>
    </div>
    );
}

export default Eventplan;