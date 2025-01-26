const initialState = false;

export const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'MODAL_OPEN': {
			return true;
		}
		case 'MODAL_CLOSE': {
			return false;
		}
		default:
			return state;
	}
};
