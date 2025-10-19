'use client'
import Image from "next/image";
import styles from "../page.module.css";
import React, { useState, useEffect }from 'react';
import Popup from './Popup';

const getUpdates = async(goal: string): Promise<[string, string, string, string, string]> => {
  const res = await fetch('/api', {cache: 'no-cache'});
  const data = await res.json();
  return [data.name, data.dateAndTime, data.location, data.description, data.eventType];
}

const post = async(name: string, dateAndTime: string, location: string, description: string, eventType: string) => {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name, dateAndTime: dateAndTime, location: location,
       description: description, eventType: eventType}),
  });
}

export default function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  
  const handleSave = () => {
    post(name, dateAndTime, location, description, eventType);
    setName("");
    setDateAndTime("");
    setLocation("");
    setDescription("");
    setEventType("");
    console.log(name);
    console.log(dateAndTime);
    console.log(location);
    console.log(description);
    console.log(eventType);
    setPopupOpen(false);
  }

  return (
    <div className="page">
        <button className="add" onClick={() => setPopupOpen(true)}>Create Event!</button>
        {isPopupOpen && (
          <Popup onClose={() => setPopupOpen(false)}>
            <h2>Add Event Details:</h2>
            <p>Event Name:<input onChange={(e) => setName(e.target.value)} value={name} placeholder='name'></input></p>
            <p>Date and Time:<input onChange={(e) => setDateAndTime(e.target.value)} value={dateAndTime} placeholder='time and date'></input></p>
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
            <button className="save" onClick={handleSave}>save</button>
          </Popup>
        )}
    </div>
  );
}