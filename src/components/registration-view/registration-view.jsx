import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Card, CardGroup, Container, Row, Col, FloatingLabel} from 'react-bootstrap';
import "./registration-view.scss";
import { Link } from 'react-router-dom'

export function RegistrationView() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [email, setEmail] = useState('');
        const [birthday, setBirthday] = useState('');
        const [error, setError] = useState('');
    
        const handleSubmit = (e) => {
            e.preventDefault();
    
            // error validation
            if (username.length < 4) return setError('Must include a username that is longer than 4 characters');
            if (password.length < 6) return setError('Must include a password that is longer than 6 characters');
            const alphaNum = /^[0-9a-zA-Z]+$/;
            if (!username.match(alphaNum)) return setError('Username must contain only letters and numbers');
            if (password !== confirmPassword) return setError('Passwords do not match');
    
            axios.post('https://stormy-inlet-21959.herokuapp.com/users/', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    console.log(response.data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch(e => {
                    setError('Username already exists please pick another one')
                    console.log('error registering the user')
                });
        }
    

  return (
      <Container>
           <Row>
              <Col>
                  <CardGroup>
                      <Card>
                          <Card.Body>
                          <Form className="registration-view" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                            <h1 style={{ fontWeight: 700 }}>Register</h1>
                                    <FloatingLabel controlId="formUsername" label="Username*" className="mb-3 mt-4">
                                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="formPassword" label="Password*" className="mb-3">
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="formConfirmPassword" label="Confirm Password*" className="mb-3">
                                        <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="confirmPassword" required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="formEmail" label="Email*" className="mb-3">
                                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="formBirthday" label="Birthday" className="mb-3">
                                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="birthday" />
                                    </FloatingLabel>
                                    {error && <h5 style={{ color: "red", marginBottom: "40px" }}>{error}</h5>}
                                    <div className="d-grid gap-2">
                                        <Button size="lg" variant="success" type="submit">Submit</Button>
                                    </div>
                                    <br />
                            <Link to={`/`}>
                                    <Button size="lg" variant="primary" className="login-button">Login</Button>
                                </Link>
                            </Form>
                          
                          </Card.Body>
                      </Card>
                  </CardGroup>
              </Col>
          </Row>
      </Container>
  )
}