import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class ReactForm extends Component {
    constructor(props) {
        super(props);
    }

	render() {
		return (
		  <Form onSubmit = {(event) => this.props.handleSubmit(event)}>
		    <FormGroup>
		      <Label for="query">* Enter recipe keyword(s)</Label>
		      <Input onChange={(event) => this.props.handleChange(event)} type="text" name="query" id="query" 
		      		 placeholder="Enter query keyword e.g. chicken" value={this.props.query} />
		    </FormGroup>
		    <FormGroup>
		      <Label for="dietLabel">Select a nutrition label</Label>
		      <Input onChange={(event) => this.props.handleChange(event)} type="select" name="dietLabel" id="dietLabel" value={this.props.dietLabel}>
		        <option>No Preference</option>
		        <option>Balanced</option>
		        <option>High-Protein</option>
		        <option>Low-Fat</option>
		        <option>High-Fiber</option>
		        <option>Low-Carb</option>
		        <option>Low-Sodium</option>
		      </Input>
		    </FormGroup>
		    <FormGroup>
		      <Label for="calorieRange">Calories per Serving</Label>
		      <Input onChange={(event) => this.props.handleChange(event)} type="select" name="calorieRange" id="calorieRange" value={this.props.calorieRange}>
		        <option>No Preference</option>
		        <option>100-300</option>
		        <option>300-500</option>
		        <option>500-700</option>
		        <option>700+</option>
		      </Input>
		    </FormGroup>
		    <Button size="md" disabled={this.props.query == '' ? true : false} type="submit">Search</Button>
		  </Form>
		);
	}
}