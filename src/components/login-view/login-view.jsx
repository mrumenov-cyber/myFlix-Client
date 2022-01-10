import React, { useState } from 'react';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
import './login-view.scss';
import PropTypes from 'prop-types';
import { RegistrationView } from "../registration-view/registration-view";
import axios from 'axios';
import {MainView} from "../main-view/main-view";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 2){
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 4){
      setPassword('Password must be 4 characters long');
      isReq = false;
    }

  return isReq;
}


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
    /* Send a request to the server for authentication */
      axios.post('https://stormy-inlet-21959.herokuapp.com/login', {
      Username: username,
      Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username), which provides the username to our parent component (child to parent communication) */
    /*props.onLoggedIn(username)
  };*/

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };*/

  return (
    <Form className='LoginView-container'>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button className='submit-button' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button className="new-account-button">
        Create New Account
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};