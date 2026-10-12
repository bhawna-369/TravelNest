import { useEffect, useState } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import { Places } from "./api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  FaSearch,
  FaFilter,
  FaRedoAlt,
  FaMapMarkerAlt,
  FaStar,
  FaCompass,
  FaGlobe,
  FaTag,
  FaRupeeSign,
} from "react-icons/fa";

import ExploreMap from "../../component/Map/ExploreMap";

export function Destination() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      if (Array.isArray(Places)) {
        setData(Places);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error loading places:", error);
      setData([]);
    }
  }, []);

  // Safe Extraction
  const safePlaces = Array.isArray(data) ? data : [];
  const locations = [...new Set(safePlaces.map((p) => p?.location).filter(Boolean))];
  const categories = [...new Set(safePlaces.map((p) => p?.category).filter(Boolean))];

  const budgetRanges = [
    { label: "Under ₹10,000", min: 0, max: 10000 },
    { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
    { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
    { label: "Above ₹50,000", min: 50000, max: Infinity },
  ];

  function parsePrice(price) {
    if (price === undefined || price === null) return 0;
    try {
      const cleaned = price.toString().replace(/[^0-9.]/g, "");
      return parseFloat(cleaned) || 0;
    } catch {
      return 0;
    }
  }

  const initialValues = {
    searchText: "",
    countries: [],
    budgets: [],
    categories: [],
    sortBy: "popular",
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Rich Dark Blue Header Banner */}
      <div
        className="position-relative text-white mb-4 shadow-sm"
        style={{
          height: "200px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center px-3">
          <Badge
            bg="primary"
            className="mb-2 px-3 py-2 rounded-pill text-uppercase tracking-wider fw-semibold shadow-sm"
          >
            <FaCompass className="me-1" /> travelNest
          </Badge>
          <h1
            className="fw-bold text-uppercase mb-1"
            style={{ letterSpacing: "1px", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            Let's Explore Together
          </h1>
          <p className="small text-white-50 mb-0">
            Find and filter destinations according to your travel preferences.
          </p>
        </div>
      </div>

      <Container fluid="lg">
        {/* Interactive Map Section Box */}
        <Card
          className="border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white"
          style={{
            border: "2px solid #cbd5e1",
            outline: "1px solid #e2e8f0",
          }}
        >
          <Card.Header className="bg-white border-bottom py-2 px-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span
                className="rounded-circle bg-danger d-inline-block"
                style={{ width: "10px", height: "10px" }}
              ></span>
              <span className="fw-bold small text-dark text-uppercase tracking-wider">
                Interactive Destination Map
              </span>
            </div>
            <Badge bg="light" text="dark" className="border">
              Live View
            </Badge>
          </Card.Header>

          <Card.Body className="p-2 p-md-3 bg-light">
            <div className="rounded-3 overflow-hidden border">
              <ExploreMap />
            </div>
          </Card.Body>
        </Card>

        {/* Filter Formik Wrapper */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ values, handleReset }) => {
            const filteredData = safePlaces
              .filter((item) => {
                if (!item) return false;

                const searchLower = (values.searchText || "").trim().toLowerCase();

                // 1. Search Query Match
                if (searchLower) {
                  const titleMatches = (item.title || "").toLowerCase().includes(searchLower);
                  const locationMatches = (item.location || "").toLowerCase().includes(searchLower);
                  const categoryMatches = (item.category || "").toLowerCase().includes(searchLower);

                  if (!titleMatches && !locationMatches && !categoryMatches) {
                    return false;
                  }
                }

                // 2. Location Check
                if (
                  Array.isArray(values.countries) &&
                  values.countries.length > 0 &&
                  !values.countries.some((loc) =>
                    (item.location || "").toLowerCase().includes(loc.toLowerCase())
                  )
                ) {
                  return false;
                }

                // 3. Category Check
                if (
                  Array.isArray(values.categories) &&
                  values.categories.length > 0 &&
                  !values.categories.includes(item.category)
                ) {
                  return false;
                }

                // 4. Budget Range Check
                if (Array.isArray(values.budgets) && values.budgets.length > 0) {
                  const priceNum = parsePrice(item.price_per_person);
                  const matchesAnyBudget = values.budgets.some((label) => {
                    const range = budgetRanges.find((b) => b.label === label);
                    if (!range) return false;
                    return priceNum >= range.min && priceNum < range.max;
                  });

                  if (!matchesAnyBudget) return false;
                }

                return true;
              })
              .sort((a, b) => {
                if (values.sortBy === "popular") {
                  return (b.rating || 0) - (a.rating || 0);
                } else if (values.sortBy === "price_low") {
                  return parsePrice(a.price_per_person) - parsePrice(b.price_per_person);
                } else if (values.sortBy === "price_high") {
                  return parsePrice(b.price_per_person) - parsePrice(a.price_per_person);
                }
                return 0;
              });

            return (
              <FormikForm onSubmit={(e) => e.preventDefault()}>
                <Row className="g-4">
                  {/* Sidebar Filters */}
                  <Col lg={3} md={4}>
                    <Card
                      className="border-0 shadow-sm rounded-4 p-3 sticky-top bg-white"
                      style={{ top: "20px", zIndex: 10 }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                        <div className="d-flex align-items-center gap-2 fw-bold text-dark">
                          <FaFilter className="text-primary" />
                          <span>Filters</span>
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          type="button"
                          className="text-decoration-none text-muted p-0 small fw-semibold d-flex align-items-center gap-1"
                          onClick={handleReset}
                        >
                          <FaRedoAlt size={10} /> Clear All
                        </Button>
                      </div>

                      {/* Search Destination */}
                      <div className="mb-3">
                        <Form.Label className="small text-uppercase fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                          <FaSearch /> Search Destination
                        </Form.Label>
                        <Field
                          as={Form.Control}
                          name="searchText"
                          type="text"
                          placeholder="Search title, location..."
                          className="rounded-3 py-2 border-light-subtle shadow-none bg-light"
                          style={{ fontSize: "14px" }}
                        />
                      </div>

                      {/* Location Filter */}
                      <div className="mb-3">
                        <Form.Label className="small text-uppercase fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                          <FaGlobe /> Location
                        </Form.Label>
                        <div
                          className="d-flex flex-column gap-2"
                          style={{ maxHeight: "180px", overflowY: "auto" }}
                        >
                          {locations.map((loc) => (
                            <Form.Check key={loc} id={`loc-${loc}`}>
                              <Field
                                type="checkbox"
                                name="countries"
                                value={loc}
                                as={Form.Check.Input}
                              />
                              <Form.Check.Label className="small text-secondary ms-1">
                                {loc}
                              </Form.Check.Label>
                            </Form.Check>
                          ))}
                        </div>
                      </div>

                      {/* Budget Target Filter */}
                      <div className="mb-3">
                        <Form.Label className="small text-uppercase fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                          <FaRupeeSign /> Budget Target
                        </Form.Label>
                        <div className="d-flex flex-column gap-2">
                          {budgetRanges.map((range) => (
                            <Form.Check key={range.label} id={`budget-${range.label}`}>
                              <Field
                                type="checkbox"
                                name="budgets"
                                value={range.label}
                                as={Form.Check.Input}
                              />
                              <Form.Check.Label className="small text-secondary ms-1">
                                {range.label}
                              </Form.Check.Label>
                            </Form.Check>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div className="mb-1">
                        <Form.Label className="small text-uppercase fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                          <FaTag /> Category
                        </Form.Label>
                        <div
                          className="d-flex flex-column gap-2"
                          style={{ maxHeight: "180px", overflowY: "auto" }}
                        >
                          {categories.map((cat) => (
                            <Form.Check key={cat} id={`cat-${cat}`}>
                              <Field
                                type="checkbox"
                                name="categories"
                                value={cat}
                                as={Form.Check.Input}
                              />
                              <Form.Check.Label className="small text-secondary ms-1">
                                {cat}
                              </Form.Check.Label>
                            </Form.Check>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Right Destinations Section */}
                  <Col lg={9} md={8}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center bg-white shadow-sm rounded-4 px-3 py-2 mb-4 gap-3">
                      <div className="text-secondary small fw-medium">
                        Showing{" "}
                        <Badge bg="primary-subtle" text="primary" className="fs-6 fw-bold mx-1">
                          {filteredData.length}
                        </Badge>{" "}
                        destinations
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted text-nowrap">Sort by:</span>
                        <Field
                          as={Form.Select}
                          name="sortBy"
                          className="form-select border-0 bg-light rounded-3 shadow-none fw-medium"
                          style={{ minWidth: "160px", fontSize: "14px" }}
                        >
                          <option value="popular">Popularity</option>
                          <option value="price_low">Price: Low to High</option>
                          <option value="price_high">Price: High to Low</option>
                        </Field>
                      </div>
                    </div>

                    {/* Content Display */}
                    {filteredData.length === 0 ? (
                      <Card className="border-0 text-center py-5 shadow-sm rounded-4 bg-white">
                        <Card.Body className="py-5 text-muted">
                          <span className="fs-1 d-block mb-2">🔍</span>
                          <h6 className="fw-bold text-dark">No places found</h6>
                          <p className="small mb-3">
                            Try adjusting or clearing your active filters.
                          </p>
                          <Button variant="outline-primary" size="sm" type="button" onClick={handleReset}>
                            Reset Filters
                          </Button>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Row xs={1} sm={2} lg={3} className="g-4">
                        {filteredData.map((item) => (
                          <Col key={item.id || item.title}>
                            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                              <div className="position-relative" style={{ height: "180px" }}>
                                <Card.Img
                                  variant="top"
                                  src={item.image}
                                  className="w-100 h-100"
                                  style={{ objectFit: "cover" }}
                                />
                                {item.category && (
                                  <Badge
                                    className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded-pill text-uppercase fw-bold shadow-sm"
                                    style={{
                                      fontSize: "10px",
                                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                                      backdropFilter: "blur(4px)",
                                    }}
                                  >
                                    {item.category}
                                  </Badge>
                                )}
                              </div>
                              <Card.Body className="p-3 d-flex flex-column justify-content-between">
                                <div>
                                  <Card.Title
                                    className="fw-bold text-dark mb-1 text-truncate"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {item.title}
                                  </Card.Title>
                                  <Card.Text className="text-muted small d-flex align-items-center mb-3">
                                    <FaMapMarkerAlt className="text-danger me-1" />
                                    <span>{item.location}</span>
                                  </Card.Text>
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                                  <div className="d-flex align-items-center gap-1">
                                    <FaStar className="text-warning" />
                                    <span className="small fw-bold text-dark">
                                      {Number(item.rating || 0).toFixed(1)}
                                    </span>
                                  </div>
                                  <div className="fw-bold text-success" style={{ fontSize: "15px" }}>
                                    {item.price_per_person}
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Col>
                </Row>
              </FormikForm>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}