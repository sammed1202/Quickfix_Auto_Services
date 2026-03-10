import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// Custom icons (optional)
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [30, 30],
});

const shopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  iconSize: [30, 30],
});

const BookingMap = ({ userCoords, shopCoords }) => {
  if (!userCoords || !shopCoords) return <p>Location missing</p>;
  if (
    !userCoords ||
    !shopCoords ||
    userCoords.lat === undefined ||
    userCoords.lng === undefined ||
    shopCoords.lat === undefined ||
    shopCoords.lng === undefined
  ) {
    console.error("❌ Invalid coordinates for map:", {
      userCoords,
      shopCoords,
    });
    return <div>Error: Invalid coordinates for map</div>;
  }

  return (
    <MapContainer
      center={userCoords}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Marker */}
      <Marker position={userCoords} icon={userIcon} />

      {/* Shop Marker */}
      <Marker position={shopCoords} icon={shopIcon} />

      {/* Route line */}
      <Polyline positions={[shopCoords, userCoords]} color="blue" />
    </MapContainer>
  );
};

export default BookingMap;
