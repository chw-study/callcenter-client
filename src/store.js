import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import history from './history';
import {combineReducers} from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux'




const reducer = combineReducers({...reducers, routing: routerReducer});

export const store = createStore(
  reducer,
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
    createLogger()
  )
);
