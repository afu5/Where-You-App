import {NextRequest, NextResponse } from 'next/server'

let events: {
  "name": string,
  "time": string,
  "location": string,
  "description": string,
  "eventType": string,
}[] = [];

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