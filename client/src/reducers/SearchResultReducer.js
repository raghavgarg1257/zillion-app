import { SEARCH_RESULT } from '../const';

export default function( state = null, action) {

    switch (action.type) {
        case SEARCH_RESULT : return action.payload;

        default: return state;
    }

}
