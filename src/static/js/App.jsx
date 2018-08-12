import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import Recipes from "./Recipes";
import RecipeForm from "./RecipeForm";

var $ = require('jquery');


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querySubmitted: false
        };
    }

    recipeURL(){
        var recipeAPI_URL = "https://api.edamam.com/search?q=chicken&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";
        return recipeAPI_URL;
    }

    render () {
        if(this.state.querySubmitted){
            return(
                <Container fluid>
                    <Row>
                        <Recipes dietLabel="none" url="https://api.edamam.com/search?q=chicken&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329"/>
                    </Row>
                </Container>
            );

        } else{
            return (
                <RecipeForm/>
            );
        }

    }
}
