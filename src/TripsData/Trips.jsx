import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import { Table, Pagination, Spinner } from "react-bootstrap";

import "../index.css";

function Trips() {
  const [trips, setTrips] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  useEffect(() => {
    fetch(
      `https://vast-basin-93738.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setTrips(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [page]);

  if (trips === null) {
    return (
      <>
        <h2 className="mt-5">The server is processing your request</h2>
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else {
    return (
      <>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              <h3>Trips List</h3>
            </Card.Title>
            <Card.Text>
              Full list of Citibike Trips.
              <span className="float-right" style={{ fontSize: "larger" }}>
                <Badge className="Subscriber mr-2">Subscribers</Badge>
                <Badge className="Customer">Customers</Badge>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>

        <Table bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Bike ID</th>
              <th>Start Station</th>
              <th>End Station</th>
              <th>Duration (Minutes)</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => {
              return (
                <tr
                  key={trip._id}
                  className={trip.usertype}
                  onClick={() => {
                    navigate(`/trip/${trip._id}`);
                  }}
                >
                  <td>{trip.bikeid}</td>
                  <td>{trip["start station name"]}</td>
                  <td>{trip["end station name"]}</td>
                  <td>{(trip.tripduration / 60).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </>
    );
  }
}

export default Trips;
