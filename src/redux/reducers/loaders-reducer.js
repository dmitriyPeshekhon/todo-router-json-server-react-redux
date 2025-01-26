const initialState = {
	isLoading: false, // для лоадера на MainPage и TodoPage
	isLoadingAddTodo: false, // для лоадера при добавлении нового туду
	isLoadingEditTodo: false,
};

export const loadersReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'IS_LOADING': {
			return { ...state, isLoading: payload };
		}
		case 'IS_LOADING_ADD_TODO': {
			return { ...state, isLoadingAddTodo: payload };
		}
		case 'IS_LOADING_EDIT_TODO': {
			return { ...state, isLoadingEditTodo: payload };
		}
		default:
			return state;
	}
};
