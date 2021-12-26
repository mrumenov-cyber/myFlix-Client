<<<<<<< Updated upstream
=======
import React, { useState } from 'react';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
import './login-view.scss';
import PropTypes from 'prop-types';
import { RegistrationView } from "../registration-view/registration-view";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (
    <Form className='LoginView-container'>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button className='submit-button' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button className="new-account-button" onClick={event =>  window.location.href='../registration-view/registration-view'}>
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
>>>>>>> Stashed changes
