import { combineReducers } from 'redux';

// reducers
import SearchResultReducer from './SearchResultReducer';
import AllKeywordsReducer from './AllKeywordsReducer';
import ActiveKeywordReducer from './ActiveKeywordReducer';

// combining all reducer into one store
const rootReducer = combineReducers({
    reducedSearchResult : SearchResultReducer,
    reducedAllKeywords : AllKeywordsReducer,
    reducedActiveKeyword : ActiveKeywordReducer
});

export default rootReducer;
