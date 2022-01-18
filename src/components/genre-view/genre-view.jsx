import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {

    const { Genre, onBackClick } = this.props;

    return (
      <Container fluid>
          <Card>
            <Row className="genre-name">
              <Col style={{fontSize:"40px"}}>{Genre.Name}</Col>
            </Row>

          <div className='text-container'>
            <Row className="genre-props">
              <Col>
                <Row className="genre-description">
                  <Col>Description: </Col>
                </Row>
                <Row className="genre-description-content">
                  <Col className="value" md={12}>{Genre.Description}</Col>
                </Row>
              </Col>
            </Row>
          </div>
          
            <Button className="genre-back-button" variant='danger' onClick={() => { onBackClick(null); }}>Back</Button>
            <br />
          </Card>
      </Container>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
  })
};