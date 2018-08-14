import React, { Component } from "react";
import { Alert, Container, Row, Col } from 'reactstrap';
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
            querySuccessful: false,
            url: '',
            query: '',
            dietLabel: 'No Preference',
            calorieRange: 'No Preference'
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQueryResponse = this.handleQueryResponse.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.getURL = this.getURL.bind(this);
    }

    handleQueryResponse(querySuccessful){
        if(querySuccessful){
            console.log('query success');
            this.setState({
                querySuccessful: true
            });
        } else{
            console.log('query failed');
            this.setState({
                querySuccessful: false
            });
        }
    }

    handlePage(event,pageNumber){
        event.preventDefault();
        console.log('handling page ' + pageNumber);
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
        var url = this.getURL(0,12);
        console.log(url);
        this.setState({
            querySubmitted: true,
            url: url
        })
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            querySubmitted: false,
            querySuccessful: false
        });     
    }

    getURL(fromIndex, toIndex){
        var processedQuery = encodeURIComponent((this.state.query).trim());
        var indexRange = "&from=" + fromIndex + "&to=" + toIndex;

        if(this.state.calorieRange == 'No Preference'){
            var url = "https://api.edamam.com/search?q=" + processedQuery + indexRange + 
                      "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";    
        } else{
            var processedCalorieRange = encodeURIComponent(this.state.calorieRange);
            var url = "https://api.edamam.com/search?q=" + processedQuery + "&calories=" + processedCalorieRange +
                      indexRange + "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";           
        }

        return url;      
    }


    render () {
        const querySubmitted = this.state.querySubmitted;
        const querySuccessful = this.state.querySuccessful;
        return(
            <div>
                <Container fluid>
                    <Navbar/>
                    <br/>
                    <Row>
                        <Col xl="2">
                            <Nav handleClick={this.handleClick} querySuccessful={this.state.querySuccessful}
                                 handlePage={this.handlePage}/>
                        </Col>
                        <Col lg="8">
                            {querySubmitted ? (
                                <Container fluid>
                                    <Row>
                                        <Recipes dietLabel={this.state.dietLabel} url={this.state.url} 
                                                 handleQueryResponse={this.handleQueryResponse}
                                                 handleClick={this.handleClick} />
                                    </Row>
                                </Container>
                            ) : (
                                <Container>
                                    <h4> Search for Recipes </h4>
                                    <hr/>
                                    <RecipeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} 
                                                query={this.state.query} dietLabel={this.state.dietLabel}
                                                calorieRange={this.state.calorieRange}/>
                                    <Alert color="danger">
                                        No results found. Please try again.
                                    </Alert>
                                </Container>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }
}
