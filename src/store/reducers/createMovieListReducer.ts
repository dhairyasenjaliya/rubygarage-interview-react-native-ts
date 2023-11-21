import {
  CREATE_LIST_FAILURE,
  CREATE_LIST_SUCCESS,
  CREATE_MOVIE_LIST,
  RESET_CREATE_LIST_ERROR,
} from '../actionTypes';

// Defining the interface for the state of the create list feature
interface CreateListState {
  creating: boolean;
  error: string | null;
  data: any;
}

// Defining the initial state of the create list feature
const initialState: CreateListState = {
  creating: false,
  error: null,
  data: null,
};

// Defining the reducer function for the create list feature
const createMovieListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_MOVIE_LIST:
      return {...state, creating: action.payload};
    case CREATE_LIST_SUCCESS:
      return {...state, creating: false, data: action.payload};
    case CREATE_LIST_FAILURE:
      return {...state, creating: false, error: action.payload};
    case RESET_CREATE_LIST_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default createMovieListReducer;
