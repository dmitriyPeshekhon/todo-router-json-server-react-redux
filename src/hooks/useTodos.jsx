import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	requestGetTodos,
	requestGetTodo,
	requestDeleteTodo,
	requestAddTodo,
	requestEditTodo,
} from '.';
import { useMemo } from 'react';

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getTodods = async () => {
			setIsLoading(true);
			const listTodos = await requestGetTodos();
			setIsLoading(false);
			if (listTodos) {
				setTodos(listTodos);
			} else {
				navigate('/loading-error-page', { replace: true });
			}
		};
		getTodods();
	}, []);

	const filteredTodos = useMemo(() => {
		if (search) {
			return todos.filter((todo) =>
				todo.title.toLowerCase().includes(search.toLowerCase()),
			);
		} else {
			return todos;
		}
	}, [search, todos]);

	const finalySortedTodos = useMemo(() => {
		if (sort) {
			return [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
		} else {
			return filteredTodos;
		}
	}, [filteredTodos, sort]);

	const handleGetTodoById = async (id) => {
		setIsLoading(true);
		const respTodo = await requestGetTodo(id);
		setIsLoading(false);
		if (respTodo) {
			return respTodo;
		} else {
			navigate('/loading-error-page', { replace: true });
		}
	};

	const handleDeleteTodo = async (id) => {
		const statusDelete = await requestDeleteTodo(id);
		if (statusDelete) {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} else {
			navigate('/action-failed-page', { replace: true });
		}
	};

	const handleAddTodo = async (title) => {
		const addiedTodo = await requestAddTodo(title);
		if (addiedTodo) {
			setTodos((prev) => [...prev, addiedTodo]);
		} else {
			navigate('/action-failed-page', { replace: true });
		}
	};

	const handleEditTodo = async (editedTodo) => {
		const statusEdit = await requestEditTodo(editedTodo);
		if (statusEdit) {
			setTodos((prev) =>
				prev.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)),
			);
		} else {
			navigate('/action-failed-page', { replace: true });
		}
	};

	return (
		<TodosContext.Provider
			value={{
				todos: finalySortedTodos,
				isLoading,
				handleGetTodoById,
				handleDeleteTodo,
				handleAddTodo,
				handleEditTodo,
				sort,
				setSort,
				setSearch,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

export const useTodos = () => useContext(TodosContext);
