import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	loadersReducer,
	modalReducer,
	todosReducer,
	todoReducer,
	searchSortReducer,
} from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	todo: todoReducer,
	searchSort: searchSortReducer,
	loaders: loadersReducer,
	modal: modalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
