import {NextRequest, NextResponse } from 'next/server'

let name: string = "";
let dateAndTime: string = "";
let location: string = "";
let description: string = "";
let eventType: string = "";

export async function GET(req: NextRequest) {
  return NextResponse.json({ name, dateAndTime, location, description, eventType });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  name = data.name;
  dateAndTime = data.dateAndTime;
  location = data.location;
  description = data.description;
  eventType = data.eventType;
  return NextResponse.json({ name, dateAndTime, location, description, eventType });
}