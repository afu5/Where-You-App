import {NextRequest, NextResponse } from 'next/server'
import type { Event } from "../page"

let events: Event[] = [];
events.push({name: "hello", time: "02:00 PM", location: "YEAH", coords: {lat: 47.6560, lng: -122.3095}, description: "let's make fun of Evan", eventType: "Academic"});
events.push({name: "hi", time: "02:00 PM", location: "YEAH", coords: {lat: 47.6554, lng: -122.3095}, description: "let's make fun of Evan", eventType: "Social"});
events.push({name: "yeah", time: "02:00 PM", location: "YEAH", coords: {lat: 47.6566, lng: -122.3095}, description: "let's make fun of Evan", eventType: "Advocacy"});

export async function GET(req: NextRequest) {
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const newEvent = await req.json();
  events.push(newEvent);
  console.log("Event added!");
  console.log(events);
  return NextResponse.json({ events });
}