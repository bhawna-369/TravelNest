import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      // Nominatim API call with custom User-Agent to avoid API block
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "TravelNestApp/1.0", // User-Agent helps avoid CORS / 403 API blocking
          },
        }
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        onSearch({
          name: result.display_name.split(",")[0],
          country: result.display_name.split(",").slice(-1)[0],
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          type: result.type,
        });
      } else {
        // Quiet fallback without breaking alert popup
        console.warn("No location results found for:", query);
      }
    } catch (error) {
      console.error("Geocoding Search Error:", error);
      // Removed alert("search failed") so popup stops interrupting!
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup className="shadow-sm rounded-pill overflow-hidden bg-white">
        <Form.Control
          type="text"
          placeholder="Search any place on map..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 shadow-none px-3 py-2"
          style={{ fontSize: "14px" }}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="px-4 d-flex align-items-center gap-2"
        >
          <FaSearch />
          {loading ? "Searching..." : "Search"}
        </Button>
      </InputGroup>
    </Form>
  );
}