import { ACTIVE_KEYWORD } from '../const';

import axios from 'axios';

function emitGetKeywordImages(data) {
    return {
        type: ACTIVE_KEYWORD,
        payload: data
    };
}

export const GetKeywordImages = query => dispatch => {

    if (query === null) {
        dispatch(emitGetKeywordImages(null));
    }
    else {
        axios.get(`${API_URL}/history/${query}`)
        .then( res => {
            dispatch(emitGetKeywordImages(res.data[0]));
        })
        .catch( err => console.log('we have got an error', err) );
    }
}
