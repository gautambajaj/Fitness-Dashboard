import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import Recipes from "./Recipes";
import RecipeForm from "./RecipeForm";
import Navbar from "./Navbar"
import Nav from "./Nav"

var $ = require('jquery');


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querySubmitted: false,
            url: '',
            query: '',
            dietLabel: 'No Preference'
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var processedQuery = encodeURIComponent((this.state.query).trim());
        var url = "https://api.edamam.com/search?q=" + processedQuery + "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";
        console.log(url);
        this.setState({
            querySubmitted: true,
            url: url,
        })
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            querySubmitted: false
        });     
    }


    render () {
        const querySubmitted = this.state.querySubmitted;
        return(
            <Container>
                <Row>
                <Col sm="12">
                    <Navbar/>
                </Col>
                    <Col md="2">
                        <Nav/>
                    </Col>
                    <Col md="10">
                    {querySubmitted ? (
                        <Container fluid>
                            <Row>
                                <Recipes dietLabel={this.state.dietLabel} url={this.state.url} handleClick={this.handleClick}/>
                            </Row>
                        </Container>
                    ) : (
                        <RecipeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} 
                                    query={this.state.query} dietLabel={this.state.dietLabel}/>
                    )}
                    </Col>
                </Row>
            </Container>
        );

    }
}
