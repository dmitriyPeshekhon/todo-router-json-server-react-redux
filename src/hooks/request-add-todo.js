import { TODOS_URL } from '../constants';

export const requestAddTodo = async (titleTodo) => {
	try {
		const response = await fetch(TODOS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: titleTodo,
				completed: false,
			}),
		});
		if (!response.ok) {
			throw new Error('Не удалось добавить задачу в базу');
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};
