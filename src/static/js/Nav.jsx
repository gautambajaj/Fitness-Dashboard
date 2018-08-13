import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <ListGroup flush>
        <ListGroupItem disabled tag="a" href="#">Recipe-Search</ListGroupItem>
        <ListGroupItem tag="a" href="#">Fitbit</ListGroupItem>
        <ListGroupItem tag="a" href="#">Habit-Tracker</ListGroupItem>
      </ListGroup>
    );
  }
}