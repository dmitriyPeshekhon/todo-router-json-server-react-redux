import './ListTodos.css';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Link } from 'react-router-dom';
import { requestEditTodo } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editTodo } from '../../redux/actions';

export const Todo = ({ todo }) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChangeCheckbox = async () => {
		setIsUpdating(true);
		const editedTodo = { ...todo, completed: !todo.completed };
		const statusEdit = await requestEditTodo(editedTodo);
		if (statusEdit) {
			dispatch(editTodo(editedTodo));
			setIsUpdating(false);
		} else {
			setIsUpdating(false);
			navigate('/action-failed-page', { replace: true });
		}
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
