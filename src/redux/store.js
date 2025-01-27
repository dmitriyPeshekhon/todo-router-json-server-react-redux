import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { modalReducer, todosReducer, searchSortReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	searchSort: searchSortReducer,
	modal: modalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
