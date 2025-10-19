import {NextRequest, NextResponse } from 'next/server'
import type { Event } from "../page"

let events: Event[] = [];
events.push({name: "Dubhacks", time: "09:00 AM", location: "HUB", coords: {lat: 47.6553250210497, lng: -122.30502490115505}, description: "PNW's largest hackathon", eventType: "academic"});
events.push({name: "Crafts", time: "01:00 PM", location: "Suzzallo library", coords: {lat: 47.65575450482646, lng: -122.30806466661339}, description: "I have 2 hours before classes start and am working on some crafts, come by to chat! (and craft)", eventType: "social"});
events.push({name: "Tabling for reproductive rights", time: "02:00 PM", location: "Quad", coords: {lat: 47.657249487551425, lng: -122.30721748507102}, description: "Come support a UW RSO and learn more about your reproductive rights!", eventType: "advocacy"});

export async function GET(req: NextRequest) {
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const newEvent = await req.json();
  events.push(newEvent);
  return NextResponse.json({ events });
}