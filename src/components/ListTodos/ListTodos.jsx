import './ListTodos.css';
import { useMemo } from 'react';
import { Todo } from './Todo.jsx';
import { useSelector } from 'react-redux';

export const ListTodos = () => {
	const todos = useSelector((store) => store.todos);
	const search = useSelector((store) => store.searchSort.search);
	const sort = useSelector((store) => store.searchSort.sort);

	const filteredTodos = useMemo(() => {
		if (search && search !== '') {
			return todos.filter((e) =>
				e.title.toLowerCase().includes(search.trim().toLowerCase()),
			);
		} else {
			return todos;
		}
	}, [todos, search]);

	const sortedTodos = useMemo(() => {
		if (sort) {
			return [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
		} else {
			return filteredTodos;
		}
	}, [filteredTodos, sort]);

	return (
		<ul className="ul-list-todos">
			{sortedTodos.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</ul>
	);
};
