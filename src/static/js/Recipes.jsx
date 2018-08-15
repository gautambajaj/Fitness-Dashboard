import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import RecipeCard from "./RecipeCard";

var $ = require('jquery');


export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: [],
          dataLoaded: false,
          initialRender: true
        };

        this.getRecipes = this.getRecipes.bind(this);
    }

    getRecipes(isInitialRequest){
        var API_URL = this.props.url;
        var dietLabel = this.props.dietLabel;
        $.ajax({
            url: API_URL,
            data: {
              format: 'json'
            },
            success: (data) => {
                var filteredData = data['hits'];
                if(dietLabel != "No Preference"){
                    filteredData = data['hits'].filter(hit => {
                        return hit['recipe']['dietLabels'].includes(dietLabel);
                    });
                }
                data = filteredData;

                var id = 0;

                let recipes = data.map(hit => {
                    var yieldQty = hit['recipe']['yield'];
                    var caloriesPerServing = Math.trunc((hit['recipe']['calories'] / yieldQty));
                    var tagData = hit['recipe']['healthLabels'];
                    var tags = ""
                    tagData.forEach(function (tag){
                        tags = tags + "#" + tag + " ";
                    });

                    var recipe = {
                        id: id,
                        label: hit['recipe']['label'],
                        image: hit['recipe']['image'],
                        tags: tags,
                        yields: yieldQty,
                        calories: caloriesPerServing ,
                        redirect: hit['recipe']['url']
                    }
                    ++id;
                    return recipe;
                });

                this.setState({
                    recipes: recipes,
                    dataLoaded: true
                });
                if(isInitialRequest){
                    this.props.handleQueryResponse(true,filteredData.length);                          
                }
            }, 
            error: (error) => { 
                var msg = "Error occurred on get request to recipe API: " + API_URL;
                console.log(msg);
                if(isInitialRequest){
                    this.props.handleQueryResponse(false,filteredData.length);                          
                }      
            }
        });
    }

    componentDidMount() {
        this.getRecipes(true);
    }


    render () {
        var fromIndex = ((this.props.pageNumber-1)*12);
        var toIndex = (this.props.pageNumber*12);
        var recipes = this.state.recipes.slice(fromIndex,toIndex)

        let recipeCards;
        if(this.state.dataLoaded && this.state.recipes.length > 0){
            recipeCards = recipes.map(recipe => {
                return (
                    <Col key={recipe.id} sm="4">
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    </Col>
                )
            });        
        } else if(this.state.dataLoaded){
            console.log('no results');
        }

        return (
            <Container fluid>
                <Row>
                    {recipeCards}                        
                </Row>
            </Container>
        );
    }
}
