import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {
  fetchDataSuccess,
  fetchDataFailure,
  FETCH_MOVIE_LIST,
  createListSuccess,
  createListFailure,
  CREATE_MOVIE_LIST,
} from '../actionTypes';
import {fetchMovieListLogic, createListLogic} from './dataLogic';

interface Movie {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string;
}

interface MovieList {
  total_pages: number;
  results: Movie[];
}

interface AppState {
  // AppState here
}

type AppThunkDispatch = ThunkDispatch<AppState, any, any>;

const mockStore = configureMockStore<AppState, AppThunkDispatch>([thunk]);

const mockResponse: {data: MovieList} = {
  data: {
    total_pages: 2,
    results: [
      {
        description: 'Mock movie 1',
        favorite_count: 10,
        id: 1,
        item_count: 100,
        iso_639_1: 'en',
        list_type: 'movie',
        name: 'Mock Movie List 1',
        poster_path: 'mock_poster_path_1',
      },
    ],
  },
};

describe('fetchMovieListLogic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful movie list fetch', () => {
    const store: MockStoreEnhanced<AppState, AppThunkDispatch> = mockStore({});
    const dispatchFn: jest.Mock<void, any[]> = jest.spyOn(store, 'dispatch');
    const doneFn: jest.Mock<void, any[]> = jest.fn();

    axios.request = jest.fn().mockResolvedValueOnce(mockResponse);

    const action = {
      type: FETCH_MOVIE_LIST,
      page: 1,
    };

    const fetchMovieListLogicProcess = fetchMovieListLogic.process;

    return fetchMovieListLogicProcess(
      {getState: store.getState, action},
      store.dispatch,
      doneFn,
    ).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith(
        fetchDataSuccess({
          list: mockResponse.data.results,
          totalPages: mockResponse.data.total_pages,
          currentPage: action.page,
        }),
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: expect.any(String),
        params: {
          page: action.page,
          session_id: expect.any(String),
          api_key: expect.any(String),
        },
      });

      expect(doneFn).toHaveBeenCalled();
    });
  });

  it('should handle failed movie list fetch', () => {
    const store: MockStoreEnhanced<AppState, AppThunkDispatch> = mockStore({});
    const dispatchFn: jest.Mock<void, any[]> = jest.spyOn(store, 'dispatch');
    const doneFn: jest.Mock<void, any[]> = jest.fn();

    axios.request = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch movie list'));

    const action = {
      type: FETCH_MOVIE_LIST,
      page: 1,
    };

    const fetchMovieListLogicProcess = fetchMovieListLogic.process;

    return fetchMovieListLogicProcess(
      {getState: store.getState, action},
      store.dispatch,
      doneFn,
    ).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith(
        fetchDataFailure('Failed to fetch movie list'),
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: expect.any(String),
        params: {
          page: action.page,
          session_id: expect.any(String),
          api_key: expect.any(String),
        },
      });

      expect(doneFn).toHaveBeenCalled();
    });
  });
});

describe('createListLogic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful movie list creation', () => {
    const store: MockStoreEnhanced<AppState, AppThunkDispatch> = mockStore({});
    const dispatchFn: jest.Mock<void, any[]> = jest.spyOn(store, 'dispatch');
    const doneFn: jest.Mock<void, any[]> = jest.fn();

    axios.request = jest.fn().mockResolvedValueOnce({data: {listId: '123'}});

    const action = {
      type: CREATE_MOVIE_LIST,
      payload: {
        movieName: 'Mock Movie List',
        movieDescription: 'Mock movie list description',
      },
    };

    const createListLogicProcess = createListLogic.process;

    return createListLogicProcess({action}, store.dispatch, doneFn).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith(
        createListSuccess({listId: '123'}),
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.any(String),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: expect.any(String),
        },
        data: {
          name: action.payload.movieName,
          description: action.payload.movieDescription,
        },
      });

      expect(doneFn).toHaveBeenCalled();
    });
  });

  it('should handle failed movie list creation', () => {
    const store: MockStoreEnhanced<AppState, AppThunkDispatch> = mockStore({});
    const dispatchFn: jest.Mock<void, any[]> = jest.spyOn(store, 'dispatch');
    const doneFn: jest.Mock<void, any[]> = jest.fn();

    axios.request = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to create movie list'));

    const action = {
      type: CREATE_MOVIE_LIST,
      payload: {
        movieName: 'Mock Movie List',
        movieDescription: 'Mock movie list description',
      },
    };

    const createListLogicProcess = createListLogic.process;

    return createListLogicProcess({action}, store.dispatch, doneFn).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith(
        createListFailure('Failed to create movie list'),
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: expect.any(String),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: expect.any(String),
        },
        data: {
          name: action.payload.movieName,
          description: action.payload.movieDescription,
        },
      });

      expect(doneFn).toHaveBeenCalled();
    });
  });
});
