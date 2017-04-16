import React, { Component } from 'react';
import { Grid, Row, PageHeader, Col, Well } from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return (
            <Grid fluid={true}>
                <Row className='text-center'>
                    <Col sm={12}>Copyright &copy; 2017 Zilion All Rights Reserved.</Col>
                </Row>
            </Grid>
        );
    }
}
