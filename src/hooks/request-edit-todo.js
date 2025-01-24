import { DELETE_TODO_URL } from '../constants/index';

export const requestEditTodo = async (editedTodo) => {
	try {
		const response = await fetch(DELETE_TODO_URL + editedTodo.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(editedTodo),
		});
		if (!response.ok) {
			throw new Error('Не удалось редактировать задачу');
		}
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
