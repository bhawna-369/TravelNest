import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt, FaStar, FaHeart, FaCompass } from "react-icons/fa";

import SearchBox from "./SearchBox";
import LocateMe from "./LocateMe";
import "./ExploreMap.css";

const redIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -40],
});

function FlyToLocation({ location }) {
  const map = useMap();

  if (location) {
    let zoom = 8;

    if (location.type === "country") {
      zoom = 4; // Kam zoom taaki poori country fit ho jaye
    } else if (location.type === "state") {
      zoom = 6; // Balanced state view
    } else if (location.type === "city") {
      zoom = 9; // Balanced city view (zyada andar tak zoom nahi karega)
    } else {
      zoom = 12; // Normal point view
    }

    map.flyTo([location.lat, location.lng], zoom, { duration: 1.5 });
  }

  return null;
}

export default function ExploreMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchedMarker, setSearchedMarker] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const filterCategories = ["All", "Countries", "Cities", "Mountains", "Beaches"];

  const saveFavorite = (name) => {
    let updated = favorites.includes(name)
      ? favorites.filter((item) => item !== name)
      : [...favorites, name];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="explore-page">
      <section className="hero-section text-center">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill mb-3 shadow-sm tag-badge">
            <FaCompass className="me-2 text-primary" /> Discover Your Next Adventure
          </Badge>
          <h1 className="hero-title">Explore The World</h1>
          <p className="hero-subtitle">
            Search any destination and unlock curated insights instantly.
          </p>

          <div className="search-box-wrapper mx-auto">
            <SearchBox
              onSearch={(location) => {
                setSearchLocation(location);
                setSearchedMarker(location);
                setSelectedPlace({
                  name: location.name,
                  country: location.country || "Global Destination",
                  lat: location.lat,
                  lng: location.lng,
                  image:
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
                  rating: 4.9,
                  description:
                    "A vibrant destination offering rich culture, memorable views, and modern experiences.",
                });
              }}
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-pill ${
                  activeFilter === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* MAIN MAP & DESTINATION DISPLAY */}
      <Container fluid="xl" className="my-5">
        <Row className="g-4 align-items-stretch">
          {/* MAP DISPLAY */}
          <Col lg={8}>
            <Card className="shadow-lg border-0 map-card h-100">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={18}
                worldCopyJump={false}
                maxBounds={[
                  [-90, -180],
                  [90, 180],
                ]}
                maxBoundsViscosity={1}
                style={{ height: "620px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  noWrap={true}
                />

                <FlyToLocation location={searchLocation} />

                <LocateMe
                  setLocation={(location) => {
                    setSearchLocation(location);
                    setSearchedMarker(location);
                    setSelectedPlace({
                      name: "My Location",
                      country: "Your Current Area",
                      image:
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
                      rating: 5.0,
                      description: "You are right here! Explore points of interest nearby.",
                    });
                  }}
                />

                {searchedMarker && (
                  <Marker
                    icon={redIcon}
                    position={[searchedMarker.lat, searchedMarker.lng]}
                  >
                    <Popup className="custom-popup">
                      <div className="popup-content text-center">
                        <h6 className="m-0 font-weight-bold">{searchedMarker.name}</h6>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </Card>
          </Col>

          {/* DESTINATION INFORMATION CARD */}
          <Col lg={4}>
            <Card className="shadow-lg border-0 destination-card h-100">
              {selectedPlace ? (
                <>
                  <div className="card-img-wrapper position-relative">
                    <Card.Img
                      variant="top"
                      src={selectedPlace.image}
                      className="destination-img"
                    />
                    <button
                      className="favorite-btn"
                      onClick={() => saveFavorite(selectedPlace.name)}
                    >
                      <FaHeart
                        size={20}
                        color={
                          favorites.includes(selectedPlace.name)
                            ? "#ff4757"
                            : "#a4b0be"
                        }
                      />
                    </button>
                    <div className="rating-badge">
                      <FaStar color="#ffa502" className="me-1" />
                      <span>{selectedPlace.rating}</span>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <h3 className="destination-title mb-1">{selectedPlace.name}</h3>
                      {selectedPlace.country && (
                        <p className="text-muted location-subtitle mb-3">
                          <FaMapMarkerAlt className="text-danger me-1" />
                          {selectedPlace.country}
                        </p>
                      )}
                      <p className="destination-description">
                        {selectedPlace.description}
                      </p>
                    </div>

                    <Button className="btn-explore-now w-100 mt-4 py-2">
                      Explore Details
                    </Button>
                  </Card.Body>
                </>
              ) : (
                <div className="empty-state p-5 text-center d-flex flex-column align-items-center justify-content-center h-100">
                  <div className="empty-state-icon mb-3">🌍</div>
                  <h4 className="fw-bold">Pick a Destination</h4>
                  <p className="text-muted small">
                    Use the search bar or select your current location to display full destination card details.
                  </p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}