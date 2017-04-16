"use strict";

import HTTP from "../../helpers/httpcodes";

// models used
import Search from "../../models/search";

class Parameter {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        console.log(req.params.keyword);
        Search.find({ keyword : req.params.keyword }, (err, docs) => {
            res.status(HTTP.OK).json( docs );
        });
    }

}

export default Parameter;
