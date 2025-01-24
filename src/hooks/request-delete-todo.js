import { DELETE_TODO_URL } from '../constants/index.js';

export const requestDeleteTodo = async (id) => {
	try {
		const response = await fetch(DELETE_TODO_URL + id, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Не удалось удалить задачу из базы данных');
		}
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
