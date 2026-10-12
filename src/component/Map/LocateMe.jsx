import { Button } from "react-bootstrap";

import { FaLocationArrow } from "react-icons/fa";

import { useMap } from "react-leaflet";

export default function LocateMe({ setLocation }) {
  const map = useMap();

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,

          lng: position.coords.longitude,

          name: "My Location",

          type: "place",
        };

        setLocation(location);

        map.flyTo(
          [location.lat, location.lng],

          15,

          {
            duration: 2,
          },
        );
      },

      () => {
        alert("Please allow location permission");
      },
    );
  };

  return (
    <Button className="locate-btn" onClick={locateUser}>
      <FaLocationArrow />
      &nbsp; Locate Me
    </Button>
  );
}
