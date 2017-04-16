import { GET_ALL_KEYWORDS } from '../const';

export default function( state = null, action) {

    switch (action.type) {
        case GET_ALL_KEYWORDS : return action.payload;

        default: return state;
    }

}
