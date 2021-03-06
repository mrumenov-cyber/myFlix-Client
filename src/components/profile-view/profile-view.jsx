import React from "react";
import axios from "axios";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

import "./profile-view.scss";
import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";


export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavouriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    getUser = (token) => {
        const Username = localStorage.getItem("user");
        axios
            .get(`https://stormy-inlet-21959.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavouriteMovies: response.data.FavouriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // Allow user to edit or update profile
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios
            .put(
                `https://stormy-inlet-21959.herokuapp.com/users/${Username}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem("user", this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("Profile is updated!");
                window.open(`/users/${Username}`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onRemoveFavuorite = (movie) => {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
    
        axios.delete(`https://stormy-inlet-21959.herokuapp.com/users/${username}/movies/${movie._id}`, { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        })
        .then((response) => {
            console.log(response);
          this.componentDidMount();
          alert("Favourite movie has been removed.");
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    


    // Deregister
    onDeleteUser() {
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://stormy-inlet-21959.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert("Profile has been deleted!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value,
        });
        this.Username = value;
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
        this.Password = value;
    }

    setEmail(value) {
        this.setState({
            Email: value,
        });
        this.Email = value;
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        })
        this.Birthday = value;
    }

    render() {
        const { movies, onBackClick } = this.props;
        const { FavouriteMovies, Username, Email, Birthday } = this.state;

        return (
            <Container className="profile-view" align="center">
                <Row>
                    <Col>
                        <Card className="user-profile">
                            <Card.Title>User Profile</Card.Title>
                            <Card.Text>
                                <div className="profile-container">
                                    <span className="label">Username: </span>
                                    <span className="value">{Username}</span>
                                    <br />
                                    <br />
                                    <span className="label">Email: </span>
                                    <span className="value">{Email}</span>
                                    <br />
                                    <br />
                                    <span className="label">Birthday: </span>
                                    <span className="value">{Birthday}</span>
                                </div>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Card>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <h4>{Username} Favourite Movies</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Body>
                                {FavouriteMovies.length === 0 && (
                                    <div className="text-center">No Favourite Movie</div>
                                )}
                                <Row className="favourite-container">
                                    {FavouriteMovies.length > 0 &&
                                        movies.map((movie) => {
                                            if (
                                                movie._id ===
                                                FavouriteMovies.find((fav) => fav === movie._id)
                                            ) {
                                                return (
                                                    <Card className="favourite-movie card-content" key={movie._id} >
                                                        <Card.Img
                                                            className="fav-poster"
                                                            variant="top"
                                                            src={movie.ImagePath}
                                                            style={{width:'15.85rem'}}
                                                        />
                                                        <Card.Body style={{ backgroundColor: "black"}}>
                                                            <Card.Title className="movie_title" style={{color: "white"}}>
                                                                {movie.Title}
                                                            </Card.Title>
                                                            <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavuorite(movie)} > Remove </Button>
                                                        </Card.Body>
                                                    </Card>
                                                );
                                            }
                                            return <></>
                                        })}
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <br />
                <br />
                        <Card className="update-profile">
                            <Card.Body>
                                <Card.Title>Update Profile</Card.Title>
                                <Form
                                    className="update-form"
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Email"
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                    <div className="bt">
                                        <Button variant="warning" type="submit" onClick={this.editUser}>Update User</Button>
                                        <Button className="delete-button" variant="danger" onClick={() => this.onDeleteUser()} > Delete User </Button>
                                    </div>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                <div>
                    <br />
                    <Button className="back-button btn btn-danger" size="md" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
                <br />
            </Container>
        );
    }
}

let mapStateToProps = (state) => {
    return {
      user: state.user,
      movies: state.movies,
    };
  };
  
  
  export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
  