import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import "./main-view.scss";
import {Container, Row, Nav, Col, Navbar} from 'react-bootstrap';

import { RegistrationView } from "../registration-view/registration-view";
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from "../login-view/login-view";
import {ProfileView} from "../profile-view/profile-view" 

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      //movies: [],
      user:null
    };
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://stormy-inlet-21959.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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

onRegistration(registration) {
        this.setState({
            registration,
        });
    }
/* When a user successfully logs in, 
this function updates the `user` property 
in state to that *particular user*/


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
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        <Navbar expand="lg" bg="dark" variant="dark" className="main-view-Navbar">
          <Container>
            <Navbar.Brand href="/">My Flix</Navbar.Brand>
            <Nav className="me-auto">
            { user && 
              <> 
                <Nav.Link href="/profile">My Profile</Nav.Link> 
                <Nav.Link href="#logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link> 
              </> 
            }
            </Nav>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {/* login page / main movies page */}
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view">Movies are loading . . .</div>;

            return <MoviesList movies={movies}/>;
          }} />
          {/* register page */}
          <Route exact path="/register" render={() => {
            console.log("registrations")
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
          {/* profile page */}
          <Route path='/profile' render={({ history }) => {
                          if (!user) return <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                          if (movies.length === 0) return <div className="main-view" />;
                          return <Col md={12}>
                              <ProfileView movies={movies} setUser={user => this.setUser(user)} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()} />
                          </Col>
                      }} /> 
          {/* movie page */}           
          <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          {/* director page */}
          <Route
            path="/directors/:Name"
            render={({ match, history }) => {
                if (!user)
                    return (
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                    <Col md={8}>
                        <DirectorView
                            Director={
                                movies.find(
                                    (m) => m.Director.Name === match.params.Name
                                ).Director
                            }
                            movies={movies}
                            onBackClick={() => history.goBack()}
                        />
                    </Col>
                );
            }}
          />
          {/* genre page */}
          <Route
            path="/genres/:Name"
            render={({ match, history }) => {
                if (!user)
                    return (
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                    <Col md={8}>
                        <GenreView
                            movies={movies}
                            Genre={
                                movies.find((m) => m.Genre.Name === match.params.Name)
                                    .Genre
                            }
                            onBackClick={() => history.goBack()}
                        />
                    </Col>
                );
            }}
          />
        </Row>
      </Router>
    );
  }
} 

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);