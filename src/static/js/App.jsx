import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import Recipes from "./Recipes";

var $ = require('jquery');


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Container fluid>
                <Row>
                    <Recipes query="chicken" dietLabel="high-protein"/>
                </Row>
            </Container>
        );
    }
}
