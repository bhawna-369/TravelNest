import { Places } from "./api";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Place = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const response = await Places();
        console.log("api: ", response);
        setdata(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  }, []);

  return (
    <>
      <h1>destinations</h1>
      <br></br>
      {loading ? <h3>Loading</h3> : null}
      <Container>
        {data && data.length > 0
          ? data.map((product) => {
              return (
                <div key={item.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={item.images?.[0]} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Button variant="primary">Explore</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          : null}
      </Container>
    </>
  );
};