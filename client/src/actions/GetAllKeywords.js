import { GET_ALL_KEYWORDS } from '../const';

import axios from 'axios';

function emitGetAllKeywords(data) {
    return {
        type: GET_ALL_KEYWORDS,
        payload: data
    };
}

export const GetAllKeywords = query => dispatch => {

    axios.get(`${API_URL}/history`)
    .then( res => {
        dispatch(emitGetAllKeywords(res.data));
    })
    .catch( err => console.log('we have got an error') );

}
