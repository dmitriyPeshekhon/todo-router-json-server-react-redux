import { TODOS_URL } from '../constants/index';

export const requestGetTodo = async (id) => {
	try {
		const request = await fetch(`${TODOS_URL}/${id}`);
		if (!request.ok) {
			throw new Error('Не удалось загрузить задачу');
		}
		return await request.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};
