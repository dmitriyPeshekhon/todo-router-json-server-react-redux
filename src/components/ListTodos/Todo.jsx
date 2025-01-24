import './ListTodos.css';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Link } from 'react-router-dom';
import { useTodos } from '../../hooks/useTodos';

export const Todo = ({ todo }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const { handleEditTodo } = useTodos();

	const handleChangeCheckbox = async () => {
		setIsUpdating(true);
		await handleEditTodo({ ...todo, completed: !todo.completed });
		setIsUpdating(false);
	};

	return (
		<li className="todo-container">
			<Checkbox
				checked={todo.completed}
				isDisabled={isUpdating}
				onChange={handleChangeCheckbox}
			/>
			<Link
				className="link-title-todo"
				style={todo.completed ? { textDecoration: 'line-through' } : {}}
				to={`/todo/${todo.id}`}
			>
				{todo.title}
			</Link>
		</li>
	);
};
