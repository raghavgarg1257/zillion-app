"use strict";

import HTTP from "../../helpers/httpcodes";

// models used
import Search from "../../models/search";

class Base {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Search.find({}, (err, docs) => {
            res.status(HTTP.OK).json( docs );
        });
    }

}

export default Base;
