import {NextRequest, NextResponse } from 'next/server'
import type { Event } from "../page"

let events: Event[] = [];
events.push({name: "hello", time: "02:00 PM", location: "YEAH", coords: {lat: 47.6560, lng: -122.3095}, description: "let's make fun of Evan", eventType: "Academic"});

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