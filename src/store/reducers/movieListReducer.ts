import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_MOVIE_LIST,
  RESET_MOVIE_LIST,
} from '../actionTypes';

// Defining the interface for the state object
interface ListsState {
  data: any[];
  loading: boolean;
  error: string | null;
  list: any[];
  currentPage: number;
}

// Defining the initial state object
const initialState: ListsState = {
  data: [],
  loading: false,
  error: null,
  list: [],
  currentPage: 1,
};

// Defining the reducer function
const movieListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIE_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_MOVIE_LIST:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export default movieListReducer;
