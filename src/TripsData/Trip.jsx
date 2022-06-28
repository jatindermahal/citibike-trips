import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Trip() {
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://vast-basin-93738.herokuapp.com/api/trips/${id}`, {
      method: "PUT",
      body: JSON.stringify(trip),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      navigate("/trips");
    });
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    let { value } = target;

    setTrip(() => {
      return { ...trip, [name]: value };
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://vast-basin-93738.herokuapp.com/api/trips/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for id: ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setTrip(data);
        } else {
          setTrip(null);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [id]);

  if (trip === null || loading) {
    return (
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h3>
              Bike:{trip.bikeid}({trip.usertype})
            </h3>
          </Card.Title>
          <Card.Text>
            {trip["start station name"]}- {trip["end station name"]}
          </Card.Text>
        </Card.Body>
      </Card>
      <MapContainer
        style={{ height: "400px" }}
        center={[
          trip["start station location"].coordinates[1],
          trip["start station location"].coordinates[0],
        ]}
        zoom={15}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[
            trip["start station location"].coordinates[1],
            trip["start station location"].coordinates[0],
          ]}
        >
          <Tooltip permanent direction="right">
            Start: {trip["start station name"]}
          </Tooltip>
        </Marker>
        <Marker
          position={[
            trip["end station location"].coordinates[1],
            trip["end station location"].coordinates[0],
          ]}
        >
          <Tooltip permanent direction="right">
            End: {trip["end station name"]}
          </Tooltip>
        </Marker>
      </MapContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Bike ID</Form.Label>
          <Form.Control
            type="number"
            name="bikeid"
            value={trip.bikeid}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birth Year</Form.Label>
          <Form.Control
            type="number"
            name="birth year"
            value={trip["birth year"]}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Check
          type="radio"
          label="Subscriber"
          name="usertype"
          value="Subscriber"
          id="subscriber"
          checked={trip.usertype === "Subscriber"}
          onChange={handleChange}
        />
        <Form.Check
          type="radio"
          label="Customer"
          name="usertype"
          value="Customer"
          id="customer"
          checked={trip.usertype === "Customer"}
          onChange={handleChange}
        />
        <hr />
        <Link to="/Trips" className="btn btn-secondary float-right ml-1">
          Back to Trips
        </Link>
        <Button type="submit" className="float-right">
          Update Trip User
        </Button>
      </Form>
    </>
  );

  //where id is a value that we will retrieve by using the "useParams" hook
}
