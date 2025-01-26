const initialState = [];

export const todosReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'ADD_LIST_TODOS': {
			return payload;
		}
		case 'ADD_TODO': {
			return [...state, payload];
		}
		case 'EDIT_TODO': {
			return state.map((todo) => (todo.id === payload.id ? payload : todo));
		}
		case 'DELETE_TODO': {
			return state.filter((todo) => todo.id !== payload.id);
		}
		default:
			return state;
	}
};
