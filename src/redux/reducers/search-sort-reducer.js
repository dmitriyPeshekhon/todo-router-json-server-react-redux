const initialState = {
	search: '',
	sort: false,
};

export const searchSortReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_SEARCH': {
			return { ...state, search: payload };
		}
		case 'TOGGLE_SORT': {
			return { ...state, sort: !state.sort };
		}
		default:
			return state;
	}
};
