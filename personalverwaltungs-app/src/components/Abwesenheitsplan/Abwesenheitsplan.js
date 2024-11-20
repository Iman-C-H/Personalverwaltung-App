import {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./Abwesenheitsplan.css";


const localizer = momentLocalizer(moment);


function Abwesenheitskalender({employee, onClose}) {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    useEffect(() => {
        if (employee && employee.id) {
            const savedEvents = JSON.parse(localStorage.getItem(`absences-${employee.id}`)) || [];

            const formattedEvents = savedEvents.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
    
            setEvents(formattedEvents);
        }
    }, [employee]);

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
            localStorage.setItem(`absences-${employee.id}`, JSON.stringify(updatedEvents));
            setNewEvent({ title: "", start: "", startTime: "", end: "", endTime: ""});
            setEditingEvent(null);
            setSelectedEvent(null);
        } else {
            alert("Bitte alle Felder ausfüllen!");
        }
    };
    // Event löschen
    const handleDeleteSelectedEvent = (eventToDelete) => {
        const confirmed = window.confirm(`Sind Sie sicher, die Abwesenheit ${eventToDelete.title} aus dem System gelöscht werden soll?`);
            //const confirmed = window.confirm(`Sind Sie sicher, die Abwesenheit ${eventToDelete.title} aus dem System gelöscht werden soll?`);
            if (confirmed) {
                const updatedEvents = events.filter(event => 
                    event.title !== eventToDelete.title ||
                    event.start.getTime() !== eventToDelete.start.getTime() ||
                    event.end.getTime() !== eventToDelete.end.getTime()
        );  
        setEvents(updatedEvents);
        localStorage.setItem(`absences-${employee.id}`, JSON.stringify(updatedEvents));
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
        <div 
        className="abwesenheitskalender-container"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',  
            backgroundColor: '#f4f4f9',
          }}
          >
           <div
           className="abwesenheitskkalender-wrapper"
        style={{
          width: '80%',  // 80% der Bildschirmbreite
          maxWidth: '1200px',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Schatten um den Kalender
        }}
       >
            <button className="zuruck-button" onClick={onClose} style={{ marginBottom: '20px' }}>Zurück zu Mitarbeiterdetails</button>
            <h2 className="abwesenheitskalender-header" style={{ textAlign: 'center', marginBottom: '20px' }}>Abwesenheitsplan für {employee.firstName} {employee.lastName}</h2>
            <div className="abwesenheitskalender-form">
            <input
                className="abwesenheitskalender-input"
                type="text"
                placeholder="Titel (z.B. Urlaub)"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />

            <div className="form-group">
            <label htmlFor="start-date" className="abwesenheitskalender-label">Von: </label>
            <input
                className="abwesenheitskalender-input"
                type="date"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />
            <input
                className="abwesenheitskalender-input"
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            />
            </div>

            <div className="form-group">
            <label htmlFor="end-date" className="abwesenheitskalender-label">Bis: </label>
            <input
                className="abwesenheitskalender-input"
                type="date"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />
            <input
                className="abwesenheitskalender-input"
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
            />
            </div>

    <button className="abwesenheitskalender-button" onClick={handleSaveEvent}>
        {editingEvent ? "Änderungen speichern" : "Abwesenheit hinzufügen"}
    </button>
    {selectedEvent && (
        <button className="abwesenheitskalender-button delete-button" onClick={() => handleDeleteSelectedEvent(selectedEvent)}>
            Abwesenheit löschen
        </button>
    )}
                </div>

            <Calendar
            className="abwesenheitskalender-calendar"
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

export default Abwesenheitskalender;