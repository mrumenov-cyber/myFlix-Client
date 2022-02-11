import React from 'react';
import axios from 'axios';
import {Button, Card, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./movie-view.scss";


export class MovieView extends React.Component {

  addFavouriteMovie() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://stormy-inlet-21959.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        alert(`Added to Favourites List`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
          <Card>
            <div className="movie-poster">
              <img src={movie.ImagePath} alt="movie Flix"  crossOrigin='anonymous' style={{width:'15.85rem'}}/>
            </div>
              <Button className="favourite-button btn btn-primary" value={movie._id} onClick={(e) => this.addFavouriteMovie(e, movie)} >
                        Add to Favourites
                      </Button>
                    <div className='text-container'>
                        <div className="movie-title">
                          <h4 className="label-value">Title: {movie.Title}</h4>
                        </div>
                        <div className="movie-description">
                          <span className="label">Description: </span>
                          <span className="value">{movie.Description}</span>
                        </div>
                        <div className="movie-genre">
                          <span className="label">Genre: </span>
                          <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="movie-director">
                          <span className="label">Director: </span>
                          <span className="value">{movie.Director.Name}</span>
                        </div>
                    </div>
                    <br />


                    <Link className='genre' to={`/genres/${movie.Genre.Name}`}>
                      <Button className='genre-btn btn btn-primary'>More about Genre</Button>
                    </Link>

                    <Link className='director' to={`/directors/${movie.Director.Name}`}>
                      <Button className='director-btn btn btn-success'>More about Director</Button>
                    </Link>

                    <Button className='back-button btn btn-danger' onClick={() => {onBackClick (null);}}>Back</Button>
            </Card>
       </Container>
    );
  }
}

