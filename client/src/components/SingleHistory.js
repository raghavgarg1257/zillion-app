import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Table, PageHeader, Col, Image } from 'react-bootstrap';

import { isExist } from '../helpers';

import { GetKeywordImages } from '../actions/GetKeywordImages';

// class component
class SingleHistory extends Component {

    componentWillMount() {
        console.log(this.props.params.keyword);
        this.props.GetKeywordImages(this.props.params.keyword);
    }

    render() {
        const { activeKeyword } = this.props;
        return (
            <Grid>
                <PageHeader>{this.props.params.keyword}</PageHeader>
                <Row className="show-grid">
                    { ( () => {
                        if (isExist(this.props.activeKeyword) && isExist(this.props.activeKeyword.response)) {
                            return this.props.activeKeyword.response.map( res => {
                                return (
                                    <Col xs={6} md={4} key={res}>
                                        <Image src={`${API_URL}/images/${res}`} thumbnail responsive />
                                    </Col>
                                );
                            } );
                        }
                        else {
                            return <h3>loading...</h3>;
                        }
                    })() }
                </Row>
            </Grid>
        );
    }
}

export default connect( store => { return {
    // variables as props from redux store
    activeKeyword : store.reducedActiveKeyword
} }, {
    // functions for action as props from actions
    GetKeywordImages
})(SingleHistory);
