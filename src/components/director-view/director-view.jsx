import React from 'react';

import './director-view.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {

    const { Director, onBackClick } = this.props;

    return (
      <Container fluid>
        <Card>
          <Row className="director-name">
            <Col style={{fontSize:"40px"}}>{Director.Name}</Col>
          </Row>
          <div className='text-container'> 
              <Col>
                <Row className="director-bio">
                  <Col>Bio: </Col>
                </Row>
                    <Row className="director-bio-content">
                      <Col className="value" md={12}>{Director.Bio}</Col>
                    </Row>
                  </Col>
                  <div>
                        <span className="label">Born: </span>
                        <span className="value">{Director.Birth}</span>
                  </div>
          </div>
              <Button className="director-back-button" variant='danger' onClick={() => { onBackClick(null); }}>Back</Button>
              <br />          
          
        </Card>
      </Container>
    );
  }
}