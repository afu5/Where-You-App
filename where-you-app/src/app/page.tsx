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
  const [hour, setHour] = useState('HH');
  const [min, setMin] = useState('MM');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [academicChecked, setAcademicChecked] = useState(true);
  const [socialChecked, setSocialChecked] = useState(true);
  const [advocChecked, setAdvocChecked] = useState(true);

  const [events, setEvents] = useState<Event[]>([]);
  
  const handleSave = async () => {
    const timeFormatted = `${hour.padStart(2, '0')}:${min.padStart(2, '0')} ${time}`;
    await post(name, timeFormatted, location, coords, description, eventType);
    setName("");
    setTime("");
    setHour("HH");
    setMin("MM");
    setLocation("");
    setCoords(null);
    setDescription("");
    setEventType("");
    setPopupOpen(false);

    const updatedEvents = await getUpdates();
    setEvents(updatedEvents.events);
  }

  const handleChange = ( type: string) => {
    if (type==="academic") {
      setAcademicChecked(!academicChecked);
    } else if (type==="social") {
      setSocialChecked(!socialChecked);
    } else {
      setAdvocChecked(!advocChecked);
    }
  };

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
            <label className={`ac-${academicChecked}`}><input className='input-box' checked={academicChecked} type="checkbox" onChange={() => handleChange("academic")}></input></label>
            <label className={`social-${socialChecked}`}><input className='input-box' checked={socialChecked} type="checkbox" onChange={() => handleChange("social")}></input></label>
            <label className={`adv-${advocChecked}`}><input className='input-box' checked={advocChecked} type="checkbox" onChange={() => handleChange("advocacy")}></input></label>
          </div>
          <div className="nav-right">
            <button className="add" onClick={() => setPopupOpen(true)}></button>
            <div className="search"></div>
          </div>
        </nav>
        <div className="map-container">
          <Map locations={events} sendClickLocation={setCoords} academicChecked={academicChecked} socialChecked={socialChecked} advocChecked={advocChecked}/>
        </div>
        
                {isPopupOpen && (
          <Popup onClose={() => setPopupOpen(false)}>
            <h3>HOST AN EVENT!</h3>
            event name:
            <input onChange={(e) => setName(e.target.value)} value={name}></input>
            time:
            <div>
              <select onChange={(e) => setHour(e.target.value)} value={hour}>
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
              </select>
            </div>
            address:
            <input onChange={(e) => setLocation(e.target.value)} value={location}></input>
            description:
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='type a short description'></textarea>
            select the type of event:
            <div>
              <select onChange={(e) => setEventType(e.target.value)} value={eventType} aria-placeholder="select">
                <option>
                </option>
                <option>
                  social
                </option>
                <option>
                  academic
                </option>
                <option>
                  advocacy
                </option>
              </select>
            </div>
            <button className="save" onClick={handleSave} disabled={name==='' || hour==='HH' 
                || min ==='MM' || location===''|| coords===null || description==='' || time===''
                || eventType===''}>save</button>
          </Popup>
        )}
    </div>
  );
}