import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

const RealTimeMap = ({ socket }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const userId = useSelector((state) => state.socket.socketId);

  useEffect(() => {
    // Listen for active users and their locations
    socket.on("activeUsers", (users) => {
      setActiveUsers(users);
    });

    // Listen for location updates
    socket.on("locationUpdate", (data) => {
      setActiveUsers((prev) =>
        prev.map((user) =>
          user.id === data.id ? { ...user, location: data.location } : user
        )
      );
    });

    // Clean up listeners on unmount
    return () => {
      socket.off("activeUsers");
      socket.off("locationUpdate");
    };
  }, [socket]);

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={[0, 0]} // Default center if no location is available
        zoom={2}
        maxZoom={18}
        minZoom={3}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeUsers.map(
          (user) =>
            user.location && (
              <Marker
                key={user.id}
                position={[user.location.latitude, user.location.longitude]}
              >
                <Popup>
                  <div>
                    <strong>
                      {user.id === userId ? "You" : `User ${user.id}`}
                    </strong>
                    <br />
                    Latitude: {user.location.latitude.toFixed(2)}
                    <br />
                    Longitude: {user.location.longitude.toFixed(2)}
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default RealTimeMap;
