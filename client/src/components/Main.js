import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Form, FormGroup, FormControl, InputGroup, Button, Col, Image } from 'react-bootstrap';

import { isExist } from '../helpers';

import { GetGoogleImages } from '../actions/GetGoogleImages'

// class component
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { showResult : false };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.GetGoogleImages(null);
        this.props.GetGoogleImages(this.searchInput.value);
        this.setState({ showResult : true });
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={8} mdOffset={2}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup bsSize='large'>
                                <InputGroup>
                                    <FormControl type="text" inputRef={ ref => this.searchInput = ref } placeholder="Search google top 10 images" />
                                    <InputGroup.Button>
                                        <Button bsSize='large' type='submit'>Search</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="show-grid">
                { ( () => {
                    if (this.state.showResult) {
                        if (isExist(this.props.searchResult) && isExist(this.props.searchResult.response)) {
                            return this.props.searchResult.response.map( res => {
                                return (
                                    <Col xs={6} md={4} key={res}>
                                        <Image src={`${API_URL}/images/${res}`} thumbnail responsive />
                                    </Col>
                                );
                            } );
                        }
                        else {
                            if (this.props.searchResult === null) {
                                return <h2>Loading...</h2>;
                            }
                            else {
                                return <h2>Nothing Found.!!</h2>;
                            }
                        }
                    }
                })() }
                </Row>
            </Grid>
        );
    }
}

export default connect( store => { return {
    // variables as props from redux store
    searchResult : store.reducedSearchResult
    // video: store.reducedVideo,
} }, {
    // functions for action as props from actions
    GetGoogleImages
})(Main);
