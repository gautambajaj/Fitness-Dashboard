import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class ReactForm extends Component {
	handleSubmit(event) {
		event.preventDefault();
		console.log(event.target[0].value);
	}

	render() {
		return (
		  <Form onSubmit={this.handleSubmit}>
		    <FormGroup>
		      <Label for="query">Enter recipe keyword(s)</Label>
		      <Input type="text" name="query" id="query" placeholder="Enter query keyword e.g. chicken" />
		    </FormGroup>
		    <FormGroup>
		      <Label for="dietLabel">Select a nutrition label</Label>
		      <Input type="select" name="dietLabel" id="dietLabel">
		        <option>Balanced</option>
		        <option>High-Protein</option>
		        <option>Low-Fat</option>
		        <option>High-Fiber</option>
		        <option>Low-Carb</option>
		        <option>Low-Sodium</option>
		      </Input>
		    </FormGroup>
		    <Button type="submit">Search</Button>
		  </Form>
		);
	}
}