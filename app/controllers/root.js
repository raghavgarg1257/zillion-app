"use strict";

import fs from 'fs';
import axios from 'axios';
import async from 'async';
import uuidV4 from 'uuid/v4';
import mime from 'mime';
import request from 'request';
import jimp from 'jimp';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

import HTTP from "../helpers/httpcodes";

import Search from "../models/search";

module.exports = (router, middlewares) => {

    router.route('/')

    // will be run for all type of request on '/'
    .all(middlewares.controllerBase)

    .get( (req, res, next) => {
        res.status(HTTP.OK).json({
            msg : 'Welcome to my world.!!'
        });
    })

    .post( (req, res, next) => {

        axios.get('https://www.googleapis.com/customsearch/v1', {
            params : {
                searchType : 'image',
                q : req.body.q,
                // start : 0,
                cx : process.env.CSE_KEY,
                key : process.env.API_KEY
            }
        })
        .then( googleRes => {

            let newSearch = new Search({
                keyword : req.body.q,
                response : []
            });

            async.eachSeries( googleRes.data.items, (image, done) => {

                const imageName = `${uuidV4()}.jpg`;
                let error = false;

                async.waterfall([
                    callback => {
                        const aImage = request
                        .get(image.link)
                        .on( 'response', response => {
                            const ext = mime.extension(response.headers['content-type']);
                            if (ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                                // do nothing
                            }
                            else {
                                error = true;
                            }
                        } )
                        .on('error', e => console.log('error') )
                        .pipe(fs.createWriteStream(`public/images/${imageName}`));
                        aImage.on('finish', () => {
                            if (error) {
                                callback(error)
                            }
                            else {
                                callback(null);
                            }
                        } );
                    },
                    callback => {
                        if (error) {
                            callback(error);
                        }
                        else {
                            console.log(`public/images/${imageName}`);
                            jimp.read(`public/images/${imageName}`)
                            .then( (downImage) => {
                                downImage
                                .quality(100)
                                .greyscale()
                                .write(`public/images/${imageName}`);
                                callback(null);
                            })
                            .catch( e => console.log('download error>>>>>>>>>>>>>>>') );
                        }
                    },
                    callback => {
                        if (!error) {
                            newSearch.response = [ ...newSearch.response, imageName ]
                            callback();
                        }
                    }
                ],  () => done() );

            }, err => {
                console.log('new record is : ', newSearch);
                newSearch.save( err => {
                    if (!err) {
                        res.status(HTTP.OK).json( newSearch );
                    }
                } );
            } );

        })
        .catch( e => console.log('google error>>>>>>>>>>>>>>>>>>>>>') );

    }); // post req end

};
