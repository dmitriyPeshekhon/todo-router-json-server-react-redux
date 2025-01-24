import { TODOS_URL } from '../constants/index';

export const requestGetTodos = async () => {
	try {
		const response = await fetch(TODOS_URL);
		if (!response.ok) {
			throw new Error('Нам не удалось загрузить данные');
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};
