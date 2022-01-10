import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin='anonymous' style={{width:'15.85rem'}}/>
        </div>
        <div className="movie-title">
          <h4 className="label-value">Title: {movie.Title}</h4>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        
        <Button className='back-button btn btn-danger' onClick={() => {onBackClick (null);}}>Back</Button>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className='director-btn btn btn-success'>Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className='genre-btn btn btn-primary'>Genre</Button>
        </Link>
       </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.date,
      Death: PropTypes.date
    }),
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
