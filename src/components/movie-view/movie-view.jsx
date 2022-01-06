import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
import "./movie-view.scss";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src="https://static.wikia.nocookie.net/jurassicpark/images/f/f5/Jurassic_World_Teaser_Poster.jpg/revision/latest?cb=20141022170706&path-prefix=de" crossOrigin='anonymous' style={{width:'15.85rem'}}/>
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
        <div className="director-bio">
          <span className="director">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        
        <Button className='back-button' onClick={() => {onBackClick (null);}}>Back</Button>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
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
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
