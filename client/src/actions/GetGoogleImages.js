import { SEARCH_RESULT } from '../const';

import axios from 'axios';

function emitGetGoogleImages(data) {
    return {
        type: SEARCH_RESULT,
        payload: data
    };
}

export const GetGoogleImages = query => dispatch => {

    if (query === null) {
        dispatch(emitGetGoogleImages(null));
    }
    else {
        axios.post(`${API_URL}`, { q : query })
        .then( res => {
            dispatch(emitGetGoogleImages(res.data));
        })
        .catch( err => console.log('we have got an error') );
    }

}
