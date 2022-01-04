import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';

export function RegisView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    //Declaring hook for each input
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });
   
  // validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setValues({...values, usernameErr: 'Username is required'});
            isReq = false;
        }else if(username.length < 5){
            setValues({...values, usernameErr: 'Username must be 5 characters long'});
            isReq = false;
        }
        if(!password){
            setValues({...values, passwordErr: 'Password is required'});
            isReq = false;
        }else if(password.length < 6){
            setValues({...values, passwordErr: 'Passsword must be at least 6 characters long'});
            isReq = false;
        }if (!email){
            setValues({...values, emailErr: 'Email is required'});
            isReq = false;
        }else if (email.indexOf('@') === -1){
            setValues({...values, emailErr: 'Email is invalid'});
            isReq = false;
        }
        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
                axios.post('https://stormy-inlet-21959.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday       
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert ('Registration succesful, please log in!');
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user');
                alert('Something went wrong. Please check your data and try again.');
            });
        }
      };

      return (
        <Container>
           <Row>
              <Col>
                  <CardGroup>
                      <Card>
                          <Card.Body>
                          <Card.Title>Registration Page </Card.Title>
                          <Form>
                          <Form.Group>
                          <Form.Label >Username</Form.Label>
                            {/* code added here to display validation error */}
                            {usernameErr && <p>{usernameErr}</p>}
                          <Form.Control 
                          type="text" 
                          value={username} 
                          onChange={e => setUsername(e.target.value)} 
                          required 
                          placeholder="Enter a username"/>
                      </Form.Group>
      
                      <Form.Group>
                          <Form.Label >Password</Form.Label>
                            {/* code added here to display validation error */}
                            {passwordErr && <p>{passwordErr}</p>}
                          <Form.Control 
                          type="password" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)} 
                          required 
                          minLength="8"
                          placeholder="Your password must be at least 8 characters"/>
                      </Form.Group>
      
                      <Form.Group controlId="formBirthday">
                          <Form.Label className="mt-3">Birthday:</Form.Label>
                          <Form.Control className="mb-3" type="date" onChange={e => setBirthday(e.target.value)} />
                      </Form.Group>
      
                      <Form.Group>
                          <Form.Label >Email</Form.Label>
                            {/* code added here to display validation error */}
                            {emailErr && <p>{emailErr}</p>}
                          <Form.Control 
                          type="email" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                          required 
                          placeholder="Enter your email address" />
                      </Form.Group>
      
                          <Button variant="outline-light" type="submit" onClick={handleSubmit}>
                          Register
                          </Button>

                          <Form.Group>
                          <Form.Label >If you are already registered, please Sign In</Form.Label>
                          </Form.Group>
                          <Button variant="outline-light" type="submit" onClick={LoginView}>
                          Sign In
                          </Button>
                          </Form> 
                          </Card.Body>
                      </Card>
                  </CardGroup>
              </Col>
          </Row>
      </Container>
              
            );
    }
