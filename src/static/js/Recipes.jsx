import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import RecipeCard from "./RecipeCard";

var $ = require('jquery');


export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var recipeAPI_URL = "https://api.edamam.com/search?q=" + "chicken" + 
                            "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";
        $.ajax({
            url: recipeAPI_URL,
            data: {
              format: 'json'
            },
            success: (data) => {
                var filteredData = data['hits'];
                if(true){
                    filteredData = data['hits'].filter(hit => {
                        return hit['recipe']['dietLabels'].includes("High-Protein");
                    });
                }
                data = filteredData;

                let recipes = data.map(hit => {
                    var yieldQty = hit['recipe']['yield'];
                    var caloriesPerServing = Math.trunc((hit['recipe']['calories'] / yieldQty));
                    var tagData = hit['recipe']['healthLabels'];
                    var tags = ""
                    tagData.forEach(function (tag){
                        tags = tags + "#" + tag + " ";
                    });

                    var recipe = {
                        label: hit['recipe']['label'],
                        image: hit['recipe']['image'],
                        tags: tags,
                        yields: yieldQty,
                        calories: caloriesPerServing ,
                        redirect: hit['recipe']['url']
                    }

                    return recipe;
                });

                this.setState({
                    recipes: recipes
                });      
            }, 
            error: (error) => { 
                console.log("Error occurred on get request to recipe API");
            }
        });
    }

    render () {
        let recipeCards = this.state.recipes.map(recipe => {
            return (
                <Col sm="4">
                  <RecipeCard recipe={recipe} />
                </Col>
            )
        });
        return (
            <Container fluid>
                <Row>
                    {recipeCards}                        
                </Row>
            </Container>
        );
    }
}
