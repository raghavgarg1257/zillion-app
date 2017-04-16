import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Table, PageHeader } from 'react-bootstrap';

import { isExist } from '../helpers';

import { GetAllKeywords } from '../actions/GetAllKeywords';

// class component
class History extends Component {

    componentWillMount() {
        this.props.GetAllKeywords();
    }

    render() {
        return (
            <Grid>
                <PageHeader>History</PageHeader>
                <Row className="show-grid">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Keyword</th>
                                <th>Number of Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            { ( () => {
                                if (isExist(this.props.allKeywords)) {
                                    return this.props.allKeywords.map( (keyword, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><Link to={`/history/${keyword.keyword}`}>{keyword.keyword}</Link></td>
                                                <td>{`${keyword.response.length} Images`}</td>
                                            </tr>
                                        );
                                    });
                                }
                            })() }
                        </tbody>
                    </Table>
                </Row>
            </Grid>
        );
    }
}

export default connect( store => { return {
    // variables as props from redux store
    allKeywords : store.reducedAllKeywords
} }, {
    // functions for action as props from actions
    GetAllKeywords
})(History);
