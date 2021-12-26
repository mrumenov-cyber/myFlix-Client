import React from 'react';
import axios from 'axios';

<<<<<<< Updated upstream
=======
import "./main-view.scss";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
>>>>>>> Stashed changes
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {Form, Button, Card, CardGroup, Container, Row, Nav, Col, Navbar} from 'react-bootstrap';


export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie:null,
      user:null
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

  
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    console.log("state Movies", movies);
  
    if (selectedMovie) return <MovieView movie={selectedMovie} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
<<<<<<< Updated upstream
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
=======
          <Navbar expand="lg" bg="dark" variant="dark" className="main-view-Navbar">
            <Container>
              <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#profile">My Profile</Nav.Link>
                <Nav.Link href="#update-profile">Update Profile</Nav.Link>
                <Nav.Link href="#logout">Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <Container>
              <div className="main-view justify-content-md-center">
                {/*If the state of `selectedMovie` is not null, 
                that selected movie will be returned otherwise, 
                all *movies will be returned*/}
                {selectedMovie
                  ? (
                <Row className="justify-content-md-center">
                    <Col md={8} className="main-view-shell">
                      <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>
                </Row>
              )
                : (
                <Row className="justify-content-md-center">
                  {movies.map(movie => ( 
                    <Col md={3}>
                      <MovieCard 
                        key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>
                  ))}
                </Row>
              )
            }
              </div>
          </Container>
      </div>   
>>>>>>> Stashed changes
    );
  }
}