import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

function About() {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h3>About</h3>
          </Card.Title>
          <Card.Text>All about this page</Card.Text>
          <Card.Link style={{ color: "black" }}>Sources:</Card.Link>
          <Card.Link href="https://reactjs.org/">React</Card.Link>
          <Card.Link href="https://react-bootstrap-v4.netlify.app/">
            React Bootstrap
          </Card.Link>
          <Card.Link href="https://reactrouter.com/">React Router</Card.Link>
        </Card.Body>
      </Card>
      <h6 style={{ fontSize: "18px" }}>
        <br />
        This project shows the trips retrieved from an API.
        <br /> It uses react along with some other 3rd party modules such as
        react bootstrap.
        <br />
        <br /> This is a single page application (SPA) with the added
        functionality of routing. This is achieved by using React Router.
        <div className="mt-3">
          On <Link to="/trips">Trips</Link> page, all the trips are fetched from
          another application which is further connected to a database.
          <ul>
            <li>
              Use the arrows &lt; and &gt; at bottom of the page to navigate
              between pages
            </li>
            <li>Each page shows 10 bike trips at a time</li>
            <li>
              Different colors make Subscribers and Customers look separate from
              each other
            </li>
            <li>Click each trip to get more details about that trip.</li>
          </ul>
        </div>
        <div className="mt-3">
          After a trip is clicked, it shows the details along with a map having
          start and end locations marked.
          <br />
          The user is allowed to update any trip by using react forms.
        </div>
      </h6>
    </>
  );
}

export default About;
