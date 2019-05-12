import {
  loadStates,
  SEARCH_START,
  SEARCH_FAILURE,
  SEARCH_SUCCESS
} from "./homeActions";

const initialState = {
  loadState: loadStates.STAND_BY,
  searchResults: []
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        loadState: loadStates.LOADING,
        searchError: null
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loadState: loadStates.COMPLETED,
        searchResults: action.value
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loadState: loadStates.ERROR,
        searchError: action.value
      };
    default:
      return state;
  }
}

export default homeReducer;
