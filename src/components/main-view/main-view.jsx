import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';


import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor(){
    super();
    //Initial state is set to null
    this.state = {
      movies: [
       /* { _id: 1, 
          Title: "Harry Potter and the Prisioner of Azkaban",
        Description: "The movie follows Harry Potter into his third year at Hogwarts. Along with his friends Ron and Hermione, Harry investigates Sirius Black, an escaped prisioner from Azkaban, the wizard prision, believed to be one of Lord Voldemort's old allies.",
        ImagePath: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_FMjpg_UX1000_.jpg"},

        { _id: 2, 
          Title: "Harry Potter and the Order of Phoneix",
          Description: "The Order of the Phoenix is a secret organisation in the Harry Potter series of fiction books written by J. K. Rowling. Founded by Albus Dumbledore to fight Lord Voldemort and his followers, the Death Eaters, the Order lends its name to the fifth book of the series, Harry Potter and the Order of the Phoenix.",
          ImagePath: "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_QL75_UY207_CR0,0,140,207_.jpg"},
        
        { _id: 3, 
          Title: "Harry Potter and Sorcerer's Stone",
          Description: "Start of Harry Potter schooling and Wizard journey. His very first year at Hogwards, the school of wizards. The red stone in the movie had the power to create the Elixir of Life, a potion that would make someone drinking it immortal.",
          ImagePath: "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg"}
        */],
      selectedMovie:null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://stormy-inlet-21959.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
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
      <div className="main-view">
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
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          ))}
        </Row>
      )
    }
  </div>
      </Container>
    );
  }
} 