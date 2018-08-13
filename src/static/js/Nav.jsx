import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {
  render() {
	let recipeSearchButton;
	if(this.props.querySubmitted){
		recipeSearchButton = (
	      <Button color="info" size="lg" block onClick={this.props.handleClick}>Modify Search</Button>
		)
	}

    return (
      <div className="sticky-top">
	      <ListGroup flush>
	        <ListGroupItem disabled tag="a" href="#">Recipe-Search</ListGroupItem>
	        <ListGroupItem tag="a" href="#">Fitbit</ListGroupItem>
	        <ListGroupItem tag="a" href="#">Habit-Tracker</ListGroupItem>
	      </ListGroup>
	      <br/>
	      <br/>
	      {recipeSearchButton}
      </div>
    );
  }
}