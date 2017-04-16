import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';

// class component
export default class Layout extends Component {

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Header />
                    { this.props.children }
                    <Footer />
                </Row>
            </Grid>
        );
    }

}
