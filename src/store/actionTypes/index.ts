import {useNavigation} from '@react-navigation/native';

// These are the user actions that can be dispatched
export const FETCH_MOVIE_LIST = 'FETCH_MOVIE_LIST'; // action type for fetching movie list
export const CREATE_MOVIE_LIST = 'CREATE_MOVIE_LIST'; // action type for creating movie list

// These are the response types that can be dispatched
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'; // action type for successful data fetch
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'; // action type for failed data fetch
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS'; // action type for successful list creation
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE'; // action type for failed list creation
export const RESET_CREATE_LIST_ERROR = 'RESET_CREATE_LIST_ERROR'; // action type for resetting create list error
export const RESET_MOVIE_LIST = 'RESET_MOVIE_LIST'; // action type for resetting movie list

// These are the function names that can be dispatched
export const fetchMovieList = (page: number) => ({
  // function for fetching movie list
  type: FETCH_MOVIE_LIST,
  page, // passes page number as parameter
});

export const resetMovieList = () => ({
  // function for resetting movie list
  type: RESET_MOVIE_LIST,
});

export const createMovieList = (
  movieName: string,
  movieDescription: string,
  navigation: any,
) => ({
  // function for creating movie list
  type: CREATE_MOVIE_LIST,
  payload: {movieName, movieDescription, navigation},
});

// These are the loading states for fetching list
export const fetchDataSuccess = (data: any) => ({
  // function for successful data fetch
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: any) => ({
  // function for failed data fetch
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// These are the loading states for creating list
export const createListSuccess = (data: any) => ({
  // function for successful list creation
  type: CREATE_LIST_SUCCESS,
  payload: data,
});

export const createListFailure = (error: any) => ({
  // function for failed list creation
  type: CREATE_LIST_FAILURE,
  payload: error,
});

export const resetCreateError = () => ({
  // function for resetting create list error
  type: RESET_CREATE_LIST_ERROR,
});
