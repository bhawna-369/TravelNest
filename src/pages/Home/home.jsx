import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Carousel } from "react-bootstrap";
import { FaHome, FaShieldAlt, FaEnvelope, FaStar, FaMapMarkerAlt, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Hidden } from "./data"; // Aapka data array

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Category");
  const [budget, setBudget] = useState("Budget");
  const [filteredPlaces, setFilteredPlaces] = useState(Hidden);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = Hidden.filter((place) => {
      const matchesSearch = 
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "Category" || place.category === category;
      
      let matchesBudget = true;
      if (budget !== "Budget" && place.price) {
        const numericPrice = parseInt(place.price.replace(/[^0-9]/g, ""), 10);
        if (budget === "Below ₹20,000") matchesBudget = numericPrice < 20000;
        else if (budget === "₹20,000 - ₹50,000") matchesBudget = numericPrice >= 20000 && numericPrice <= 50000;
        else if (budget === "Above ₹50,000") matchesBudget = numericPrice > 50000;
      }
      return matchesSearch && matchesCategory && matchesBudget;
    });
    setFilteredPlaces(results);
  };

  // Slider items ko 4-4 ke groups me divide karne ke liye helper logic
  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };
  const destinationChunks = chunkArray(filteredPlaces, 4);

  return (
    <div className="bg-light min-vh-100 pb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Premium Search Hero Banner */}
      <div 
        className="position-relative text-white d-flex align-items-center" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}
      >
        <Container className="text-center py-5">
          <h1 className="display-4 fw-extrabold mb-2 text-shadow" style={{ fontWeight: 800 }}>
            Find Your Next <span className="text-warning">Dream Destination</span>
          </h1>
          <p className="fs-6 mb-4 text-light opacity-75">Explore the most beautiful hidden corners around the globe</p>

          {/* Working Search Form */}
          <Form onSubmit={handleSearch} className="p-2 bg-white rounded-3 shadow-lg text-dark mx-auto" style={{ maxWidth: "800px" }}>
            <Row className="g-2 align-items-center">
              <Col md={4}>
                <Form.Control 
                  type="text" 
                  placeholder="Search spots, regions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 shadow-none ps-3 py-2"
                />
              </Col>
              <Col sm={6} md={3} className="border-start-md">
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} className="border-0 shadow-none py-2">
                  <option>Category</option>
                  <option>Beach</option>
                  <option>Mountain</option>
                  <option>City</option>
                </Form.Select>
              </Col>
              <Col sm={6} md={3} className="border-start-md">
                <Form.Select value={budget} onChange={(e) => setBudget(e.target.value)} className="border-0 shadow-none py-2">
                  <option>Budget</option>
                  <option>Below ₹20,000</option>
                  <option>₹20,000 - ₹50,000</option>
                  <option>Above ₹50,000</option>
                </Form.Select>
              </Col>
              <Col xs={12} md={2}>
                <Button type="submit" variant="primary" className="w-100 py-2 fw-bold rounded-2">
                  <FaSearch className="me-1" /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container className="mt-5">
        
        {/* SECTION 1: Hidden Places Slider (Carousel) */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase small tracking-wider">Top Secret Escapes</span>
            <h2 className="fw-bold m-0 text-dark">Explore Hidden Places</h2>
          </div>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 shadow-sm my-3">
            <h5 className="text-muted fw-bold">No hidden gems match your filters.</h5>
            <Button variant="link" onClick={() => { setFilteredPlaces(Hidden); setSearchQuery(""); setCategory("Category"); setBudget("Budget"); }}>Reset all</Button>
          </div>
        ) : (
          <Carousel 
            indicators={false} 
            nextIcon={<span className="carousel-control-custom-next"><FaChevronRight /></span>}
            prevIcon={<span className="carousel-control-custom-prev"><FaChevronLeft /></span>}
            className="mb-5 pb-3 px-1"
          >
            {destinationChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4">
                  {chunk.map(({ id, image_url, title, location, rating, price, category }) => (
                    <Col lg={3} sm={6} key={id}>
                      <Card className="h-100 border-0 shadow-sm rounded-3 overflow-hidden dest-card">
                        <div className="position-relative" style={{ height: "190px" }}>
                          {category && (
                            <span className="position-absolute top-0 start-0 m-2 badge bg-dark text-white fw-medium small z-2">
                              {category}
                            </span>
                          )}
                          <Card.Img variant="top" src={image_url} alt={title} className="w-100 h-100 object-cover image-scale" />
                        </div>
                        <Card.Body className="d-flex flex-column p-3 bg-white">
                          <h6 className="fw-bold text-dark text-truncate mb-1">{title}</h6>
                          <p className="text-muted small mb-3 d-flex align-items-center gap-1">
                            <FaMapMarkerAlt className="text-danger" size={12} /> <span className="text-truncate">{location}</span>
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
                            <span className="text-warning small fw-bold d-flex align-items-center">
                              <FaStar className="me-1" /> {rating ? rating.toFixed(1) : "4.5"}
                            </span>
                            <span className="fw-bold text-primary">{price}</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* SECTION 2: Trending Regions Grid (Makes it look like a Destination Hub) */}
        <div className="mb-5">
          <div className="mb-4">
            <span className="text-primary fw-bold text-uppercase small tracking-wider">Inspiration</span>
            <h2 className="fw-bold m-0 text-dark">Trending Regions</h2>
          </div>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <div className="position-relative text-white rounded-3 overflow-hidden region-banner" style={{ height: "220px", cursor: "pointer" }}>
                <div className="w-100 h-100 region-bg" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="position-absolute bottom-0 start-0 p-4">
                  <h4 className="fw-bold mb-1">Tropical Bali</h4>
                  <p className="small mb-0 opacity-75">18 Hidden Resorts</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="position-relative text-white rounded-3 overflow-hidden region-banner" style={{ height: "220px", cursor: "pointer" }}>
                <div className="w-100 h-100 region-bg" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="position-absolute bottom-0 start-0 p-4">
                  <h4 className="fw-bold mb-1">Kyoto Temples</h4>
                  <p className="small mb-0 opacity-75">12 Scenic Spots</p>
                </div>
              </div>
            </Col>
            <Col md={12} lg={4}>
              <div className="position-relative text-white rounded-3 overflow-hidden region-banner" style={{ height: "220px", cursor: "pointer" }}>
                <div className="w-100 h-100 region-bg" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="position-absolute bottom-0 start-0 p-4">
                  <h4 className="fw-bold mb-1">Romantic Paris</h4>
                  <p className="small mb-0 opacity-75 text-white">25 Luxury Escapes</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* SECTION 3: Trust & Perks Row */}
        <Row className="g-3 my-5 py-4 bg-white rounded-3 shadow-sm text-center">
          <Col md={4} className="border-end-md">
            <div className="p-3">
              <FaShieldAlt className="text-primary fs-3 mb-2" />
              <h6 className="fw-bold">100% Secured Booking</h6>
              <p className="text-muted small mb-0">Your payments and data are fully safe with us.</p>
            </div>
          </Col>
          <Col md={4} className="border-end-md">
            <div className="p-3">
              <FaHome className="text-primary fs-3 mb-2" />
              <h6 className="fw-bold">Handpicked Accommodations</h6>
              <p className="text-muted small mb-0">Every place is verified by our travel team.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3">
              <FaEnvelope className="text-primary fs-3 mb-2" />
              <h6 className="fw-bold">24/7 Premium Concierge</h6>
              <p className="text-muted small mb-0">Get on-trip live assistance anywhere anytime.</p>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
};