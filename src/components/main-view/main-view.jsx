import React from 'react';
import axios from 'axios';

import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {Form, Button, Card, CardGroup, Container, Row, Nav, Col, Navbar} from 'react-bootstrap';
import { LoginView } from "../login-view/login-view";
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user:null
    }
  }

  /*componentDidMount() {
    axios.get('https://stormy-inlet-21959.herokuapp.com/movies')
      .then(res => {
        this.setState({movies: res.data})
      })
      .catch(e => {
        console.error("Something wrong in fetching the movies!", e);
      });
  }*/

  getMovies(token) {
    axios.get('https://stormy-inlet-21959.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}


/*onLoggedIn(user) {
  this.setState({
    user
  });
}*/

  render() {
    const { movies, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    // Before the movies have been loaded
   // if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <Router>
        <Navbar expand="lg" bg="dark" variant="dark" className="main-view-Navbar">
          <Container>
            <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#profile">My Profile</Nav.Link>
              <Nav.Link href="#update-profile">Update Profile</Nav.Link>
              <Nav.Link href="#logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route exact path="/" element={
              movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            } />
          </Routes>
        </Row>
      </Router>
    );
  }
} 