import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import RecipePagination from "./RecipePagination"

export default class Example extends React.Component {
  render() {
	let searchActions;
	var style = {
        marginLeft: "4%"
    }
	if(this.props.querySuccessful && this.props.querySuccessful != 'N/A'){
		searchActions = (
		  <div>
		  	<div className="text-center">
	      		<RecipePagination handlePage={this.props.handlePage} resultCount={this.props.resultCount}
	      						  pageNumber={this.props.pageNumber}/>
	      	</div>
	      	<Button style={style}color="info" size="lg" block onClick={this.props.handleClick}>Modify Search</Button>
		  </div>
		)
	}

    return (
      <div className="sticky-top">
	      <ListGroup flush>
	        <ListGroupItem disabled tag="a" href="#"><h6>Recipe-Search</h6></ListGroupItem>
	        <ListGroupItem tag="a" href="#"><h6>Fitbit</h6></ListGroupItem>
	        <ListGroupItem tag="a" href="#"><h6>Workout-Log</h6></ListGroupItem>
	      </ListGroup>
	      <br/>
	      <br/>
	      {searchActions}
	      <br/>
      </div>
    );
  }
}
/* In your database, populate it with a long list of exercises, as well as the body parts they target. 
As the user begins typing in the exercise they did, use AJAX to autocomplete or provide suggestions for the 
exercise name. Store weight, reps, and sets along with the date. Also provide a historical log that allows the 
user to view progress and see prior entries. Bonus points: Allow the user to create entire workouts, 
and all they have to do is go through the list and enter weight, sets, and reps as they complete each exercise.*/