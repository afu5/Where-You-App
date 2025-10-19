import Map from "./Map"
export default function Home() {
  const locations = [
    {id: "", lat: 47.6560, lng: -122.3095}
  ]

  return (
    <div className="page">
      <h1>Events near you:</h1>
      <Map locations={locations}/>
    </div>
  );
}