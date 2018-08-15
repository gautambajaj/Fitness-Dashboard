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
            querySuccessful: 'N/A',
            url: '',
            query: '',
            dietLabel: 'No Preference',
            calorieRange: 'No Preference',
            resultCount: 0,
            pageNumber: 0            
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQueryResponse = this.handleQueryResponse.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.getURL = this.getURL.bind(this);
    }

    handleQueryResponse(querySuccessful,count){
        if(querySuccessful){
            this.setState({
                querySuccessful: true,
                resultCount: count
            });
        } else{
            this.setState({
                querySuccessful: false,
                resultCount: 0
            });
        }
    }

    handlePage(pageNumber){
        this.setState({
            pageNumber: pageNumber
        });
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
        var url = this.getURL(0,60);
        console.log(url);
        this.setState({
            querySubmitted: true,
            url: url,
            pageNumber: 1
        })
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            querySubmitted: false,
            querySuccessful: false,
            pageNumber: 0
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

        let recipeSearch = () => {
            if(querySubmitted){
                return(
                    <Container fluid>
                        <Row>
                            <Recipes dietLabel={this.state.dietLabel} url={this.state.url} 
                                     handleQueryResponse={this.handleQueryResponse}
                                     pageNumber={this.state.pageNumber} handleClick={this.handleClick}/>
                        </Row>
                    </Container>
                );
            } else{
                return(
                    <Container>
                        <h4> Search for Recipes </h4>
                        <hr/>
                        <RecipeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} 
                                    query={this.state.query} dietLabel={this.state.dietLabel}
                                    calorieRange={this.state.calorieRange}/>
                    </Container>
                );
            }
        };

        return(
            <div>
                <Container fluid>
                    <Navbar/>
                    <br/>
                    <Row>
                        <Col xl="2">
                            <Nav handleClick={this.handleClick} querySuccessful={this.state.querySuccessful}
                                 handlePage={this.handlePage} resultCount={this.state.resultCount}
                                 pageNumber={this.state.pageNumber}/>
                        </Col>
                        <Col lg="8">
                            {recipeSearch()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }
}
