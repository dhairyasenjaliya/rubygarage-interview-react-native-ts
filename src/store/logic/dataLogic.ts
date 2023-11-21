import {createLogic} from 'redux-logic';
import axios, {AxiosRequestConfig} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import {
  fetchDataSuccess,
  fetchDataFailure,
  createListFailure,
  createListSuccess,
  FETCH_MOVIE_LIST,
  CREATE_MOVIE_LIST,
  resetMovieList,
  fetchMovieList,
} from '../actionTypes';

import {ACCOUNT_ID, API_KEY, BASE_API, SESSION_ID} from '../../helper/CONST';

interface MovieItem {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string;
}

interface MovieListData {
  list: MovieItem[];
  totalPages: number;
  currentPage: number;
}

interface CreateListPayload {
  movieName: string;
  movieDescription: string;
  navigation: any;
}

interface FetchMovieListAction {
  type: typeof FETCH_MOVIE_LIST;
  page: number;
}

interface CreateMovieListAction {
  type: typeof CREATE_MOVIE_LIST;
  payload: CreateListPayload;
  navigation: CreateListPayload;
}

// Create logic for fetching movie list
export const fetchMovieListLogic = createLogic({
  type: FETCH_MOVIE_LIST,
  async process(
    {getState, action}: {getState: any; action: FetchMovieListAction},
    dispatch: ThunkDispatch<any, any, any>,
    done: any,
  ) {
    const {page} = action;
    const currentState = getState();

    // Set options for axios request
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_API}/account/${ACCOUNT_ID}/lists`,
      params: {
        page,
        session_id: SESSION_ID,
        api_key: API_KEY,
      },
    };

    try {
      // Send axios request and retrieve data
      const response = await axios.request(options);
      const {total_pages = 1, results = []} = response?.data;

      // Combine previous page list with new list
      const previousPageList = currentState?.movieList?.data?.list || [];
      const newList: MovieItem[] = results;
      const movieList: MovieItem[] = [...previousPageList, ...newList];

      // Create data object and dispatch success action
      const data: MovieListData = {
        list: movieList,
        totalPages: total_pages,
        currentPage: page,
      };
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      // Handle error and dispatch failure action
      const axiosError = axios.isAxiosError(error) ? error : null;
      const errorMessage = axiosError?.message || 'Failed to fetch movie list';
      dispatch(fetchDataFailure(errorMessage));
    } finally {
      done();
    }
  },
});

// Create logic for creating movie list
export const createListLogic = createLogic({
  type: CREATE_MOVIE_LIST,
  async process(
    {action}: {action: CreateMovieListAction},
    dispatch: ThunkDispatch<any, any, any>,
    done: any,
  ) {
    const {movieName, movieDescription, navigation} = action.payload;

    try {
      const url = `${BASE_API}/list`;

      const headers = {
        'Content-Type': 'application/json',
      };

      const data = {
        name: movieName,
        description: movieDescription,
        language: 'en',
      };

      const params = {
        api_key: API_KEY,
        session_id: SESSION_ID,
      };

      try {
        const response = await axios.post(url, data, {
          headers,
          params,
        });
        dispatch(createListSuccess(response.data));
        dispatch(resetMovieList());
        dispatch(fetchMovieList(1));
        navigation.navigate('Lists');
        done();
      } catch (error) {
        console.error('Error creating list:', error);
      }
    } catch (error) {
      // Handle error and dispatch failure action
      const axiosError = axios.isAxiosError(error) ? error : null;
      const errorMessage =
        axiosError?.response?.data?.status_message ||
        'Failed to create movie list';
      dispatch(createListFailure(errorMessage));
    } finally {
      done();
    }
  },
});

export default [fetchMovieListLogic, createListLogic];
