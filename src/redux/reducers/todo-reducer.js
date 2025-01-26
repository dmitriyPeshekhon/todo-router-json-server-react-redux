const initialState = {};

export const todoReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_TODO': {
			return payload;
		}
		default:
			return state;
	}
};
