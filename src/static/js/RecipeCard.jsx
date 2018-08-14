import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


export default class RecipeCard extends Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
          <div>
            <Card onClick = {() => window.open(this.props.recipe.redirect, '_blank')}>
              <CardImg top width="100" src={this.props.recipe.image} alt="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
              <CardBody>
                <CardTitle>{this.props.recipe.label}</CardTitle>
                <CardSubtitle>
                    {this.props.recipe.tags}
                </CardSubtitle>
                <CardText>
                    Serving size: {this.props.recipe.yields}
                    <br/>
                    Calories per Serving: {this.props.recipe.calories}
                </CardText>
                <div className="text-center">
                <Button block outline onClick = {() => window.open(this.props.recipe.redirect, '_blank')}> View Recipe </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )
    }
};
