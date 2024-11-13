import {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);


function Abwesenheitskalender({employee}) {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    
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
    const handleAddEvent = () => {
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

            const updatedEvents = [
                ...events,
                {
                    title: newEvent.title,
                    start: start,  // `start` als Date-Objekt
                    end: end       // `end` als Date-Objekt
                }
            ];
            setEvents(updatedEvents);
            localStorage.setItem(`absences-${employee.id}`, JSON.stringify(updatedEvents));
            setNewEvent({ title: "", start: "", startTime: "", end: "", endTime: ""});
        } else {
            alert("Bitte alle Felder ausfüllen!");
        }
    };
    // Event löschen
    const handleDeleteEvent = (eventToDelete) => {
        const updatedEvents = events.filter(event => 
            event.title !== eventToDelete.title ||
            event.start.getTime() !== eventToDelete.start.getTime() ||
            event.end.getTime() !== eventToDelete.end.getTime()
        );  
        setEvents(updatedEvents);
        localStorage.setItem(`absences-${employee.id}`, JSON.stringify(updatedEvents));
    };
        


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',  // Bildschirmhöhe
            backgroundColor: '#f4f4f9',
          }}
          >
           <div
        style={{
          width: '80%',  // 80% der Bildschirmbreite
          maxWidth: '1200px',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Schatten um den Kalender
        }}
       >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Abwesenheitsplan für {employee.firstName} {employee.lastName}</h2>
            <div>
                    <input type="text" placeholder="Titel (z.B. Urlaub)" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
                    <input type="date" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} />
                    <input type="time" value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} />
                    <input type="date" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} />
                    <input type="time" value={newEvent.endTime} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} />
                    <button onClick={handleAddEvent}>Abwesenheit hinzufügen</button>
                </div>

            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500}}
            selectable
            onSelectEvent={(event) => handleDeleteEvent(event)}
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