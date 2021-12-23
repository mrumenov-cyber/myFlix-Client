import React from 'react';
import axios from 'axios';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';


import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie:null
    }
  }

  componentDidMount() {
    axios.get('https://stormy-inlet-21959.herokuapp.com/movies')
      .then(res => {
        this.setState({movies: res.data})
      })
      .catch(e => {
        console.error("Something wrong in fetching the movies!", e);
      });
  }
  
/*When a movie is clicked, 
this function is invoked and updates 
the state of the `selectedMovie` *property 
to that movie*/

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

/* When a user successfully logs in, 
this function updates the `user` property 
in state to that *particular user*/

onLoggedIn(user) {
  this.setState({
    user
  });
}

  render() {
    const { movies, selectedMovie, user } = this.state;
  
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
   // if (selectedMovie) return <MovieView movie={selectedMovie} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <Container>
      <div className="main-view justify-content-md-center">
        {/*If the state of `selectedMovie` is not null, 
        that selected movie will be returned otherwise, 
        all *movies will be returned*/}
        {selectedMovie
          ? (
        <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
        </Row>
       )
        : (
        <Row className="justify-content-md-center">
          {movies.map(movie => ( <Col md={3}>
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))}
        </Row>
      )
    }
  </div>
      </Container>
    );
  }
} 