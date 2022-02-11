import React from 'react';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';

import "./movie-card.scss";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
        <Card.Body>
        <div>
            <Link to={`/movies/${movie._id}`}>
              <Button className="open-btn align-self-end btn btn-sm btn-block">Open</Button>
            </Link>
            <br />
        </div>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <br />
        </Card.Body>
      </Card>
    );
    }
}