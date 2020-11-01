import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Container
} from "reactstrap";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { movieId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
    console.log(data)
  }, []);

  function getMovieDetail() {
    setLoading(true);
    fetch(`http://localhost:5000/getMovieById/${movieId}`)
      .then((response) => response.json())
      .then((result) => {
        const [movieDetail]=result;
        setLoading(false);
        setData(movieDetail);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  function onClickBook() {
    alert("Ticket Booked");
  }

  return (
    <Container>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <section className="movie-details-section">
            <br />
            <h2>Welcome to booking Section</h2>
            <br />
            <h4>Movie - {data.title}</h4>
            <br />
            <Card className="align-items-center ">
              <CardImg
                top
                style={{ height: "480px", width: "360px" }}
                src={data.poster}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  <h3>{data.title}</h3>
                </CardTitle>
                <CardText>
                  <p>
                    <strong>Year:</strong>
                    {data.year}
                  </p>
                  <p>
                    <strong>Type: </strong>
                    {data.type}
                  </p>
                
                  
                </CardText>
                <Button color="primary" onClick={onClickBook}>
                  Watch Movie
                </Button>
                &nbsp;
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </Button>
              </CardBody>
            </Card>
          </section>
        </>
      )}
    </Container>
  );
}
