import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {createLogicMiddleware} from 'redux-logic';
import movieListReducer from './reducers/movieListReducer';
import createMovieListReducer from './reducers/createMovieListReducer';
import dataLogic from './logic/dataLogic';

// Compose enhancers for Redux DevTools
const composeEnhancers =
  //@ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;

// Combine reducers
const rootReducer = combineReducers({
  movieList: movieListReducer,
  addMovieList: createMovieListReducer,
});

// Create logic middleware
const logicMiddleware = createLogicMiddleware(dataLogic);

// Combine logic middleware
const combinedLogicMiddleware = applyMiddleware(logicMiddleware);

// Create Redux store with combined middleware
const configureStore = createStore(
  rootReducer,
  composeEnhancers(combinedLogicMiddleware),
);

export default configureStore;
