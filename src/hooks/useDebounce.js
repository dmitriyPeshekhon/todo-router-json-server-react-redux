// useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Хук useDebounce
 * @param {any} value - Значение, которое нужно дебаунсить.
 * @param {number} delay - Задержка в миллисекундах.
 * @returns {any} - Дебаунснутое значение.
 */
export const useDebounce = (value, delay) => {
	// Состояние для хранения дебаунснутого значения
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Устанавливаем таймер для обновления дебаунснутого значения
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Очистка таймера при изменении value или delay
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
