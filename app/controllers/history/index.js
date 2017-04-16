"use strict";

import Base from "./base";
import Parameter from "./parameter";

module.exports = (router, middlewares) => {

    // explicit middleware for this route only
    router.use('/history', (req, res, next) => next() );

    // all the routes related to '/history'

    const base = new Base();
    router.route('/history')
        .all(base.all) // open route
        .get(base.get); // fetch all history

    // always place route with parameter at the end so that above routes become valid
    const parameter = new Parameter();
    router.route('/history/:keyword')
        .all(parameter.all) // open route
        .get(parameter.get); // fetch single history by keyword

};
