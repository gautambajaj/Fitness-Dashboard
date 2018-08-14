import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import RecipePagination from "./RecipePagination"

export default class Example extends React.Component {
  render() {
	let searchActions;
	var style = {
        marginLeft: "4%"
    }
	if(this.props.querySuccessful){
		searchActions = (
		  <div className="center-block">
	      	<RecipePagination handlePage={this.props.handlePage}/>
	      	<Button style={style}color="info" size="lg" block onClick={this.props.handleClick}>Modify Search</Button>
		  </div>
		)
	}

    return (
      <div className="sticky-top">
	      <ListGroup flush>
	        <ListGroupItem disabled tag="a" href="#"><h6>Recipe-Search</h6></ListGroupItem>
	        <ListGroupItem tag="a" href="#"><h6>Fitbit</h6></ListGroupItem>
	        <ListGroupItem tag="a" href="#"><h6>Habit-Tracker</h6></ListGroupItem>
	      </ListGroup>
	      <br/>
	      <br/>
	      {searchActions}
	      <br/>
      </div>
    );
  }
}