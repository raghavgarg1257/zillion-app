import { ACTIVE_KEYWORD } from '../const';

export default function( state = null, action) {

    switch (action.type) {
        case ACTIVE_KEYWORD : return action.payload;

        default: return state;
    }

}
