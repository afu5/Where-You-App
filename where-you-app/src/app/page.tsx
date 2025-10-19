'use client'
import React, { useState, useEffect }from 'react';
import Popup from './Popup';
import Map from "./Map";

export type Event = {
  name: string;
  time: string;
  location: string;
  coords: {lat: number, lng: number};
  description: string;
  eventType: string;
}

const getUpdates = async(): Promise<Event[]> => {
  const res = await fetch('/api', {cache: 'no-cache'});
  const events = await res.json();
  return events;
}

const post = async(name: string, time: string, location: string, coords: {lat: number, lng: number}, description: string, eventType: string) => {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name, time: time, location: location, coords: coords,
       description: description, eventType: eventType}),
  });
}

export default function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');

  const [events, setEvents] = useState<Event[]>([]);
  
  const handleSave = async () => {
    const timeFormatted = `${hour.padStart(2, '0')}:${min.padStart(2, '0')} ${time}`;
    await post(name, timeFormatted, location, coords, description, eventType);
    setName("");
    setTime("");
    setHour("");
    setMin("");
    setLocation("");
    setCoords({lat: 0, lng: 0});
    setDescription("");
    setEventType("");
    setPopupOpen(false);

    const updatedEvents = await getUpdates();
    setEvents(updatedEvents.events);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      const eventList = await getUpdates();
      setEvents(eventList.events);
    };
    
    fetchEvents();
  }, []);


  const generateOptions = (end: number, start: number) => {
    const result = [];
    for (var i = start; i <= end; i++) {
      result.push(<option key={i} value={i}>{i.toString().padStart(2, '0')}</option>)
    }
    return result;
  }

  return (
    <div>
        <nav>
          <div className="filter">
            show only:
            <label><input type="checkbox"></input>Academics</label>
            <label><input type="checkbox"></input>Social</label>
            <label><input type="checkbox"></input>Advocacy</label>
          </div>
          <div className="nav-right">
            
            <button className="add" onClick={() => setPopupOpen(true)}></button>
            <div className="search"></div>
          </div>
        </nav>

        <div className="map-container">
          <Map locations={events} sendClickLocation={setCoords}/>
        </div>
        
                {isPopupOpen && (
          <Popup onClose={() => setPopupOpen(false)}>
            <h2>Add Event Details:</h2>
            <p>Event Name:<input onChange={(e) => setName(e.target.value)} value={name} placeholder='name'></input></p>
            <p>Time:<select onChange={(e) => setHour(e.target.value)} value={hour}>
              <option>HH</option>
              {generateOptions(12, 1)}
            </select>:<select onChange={(e) => setMin(e.target.value)} value={min}>
              <option>MM</option>
              {generateOptions(59, 0)}
            </select>
            <select onChange={(e) => setTime(e.target.value)} value={time}>
              <option></option>
              <option>AM</option>
              <option>PM</option>
            </select></p>
            <p>Location:<input onChange={(e) => setLocation(e.target.value)} value={location} type="location" placeholder='what da addy'></input></p>
            <p>Description:<textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='type a short description'></textarea></p>
            <p>Select the Type of Event: <select onChange={(e) => setEventType(e.target.value)} value={eventType} aria-placeholder="select">
              <option>
                
              </option>
              <option>
                Social
              </option>
              <option>
                Academic
              </option>
              <option>
                Advocacy
              </option>
            </select></p>
            <button className="save" onClick={handleSave} disabled={name==='' || hour==='HH' 
                || min ==='MM' || location===''|| description==='' || time===''
                || eventType===''}>save</button>
          </Popup>
        )}
    </div>
  );
}