"use strict";

import mongoose, { Schema } from 'mongoose';

const SearchSchema = new Schema({
    keyword : String,
    response : Array
});

export default mongoose.model('search', SearchSchema);
