import './FormEditTodo.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeIsLoadingEditTodo, editTodo } from '../../redux/actions';
import { requestEditTodo } from '../../hooks';

export const FormEditTodo = () => {
	const [textArea, setTextArea] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const todo = useSelector((store) => store.todo);
	const isLoadingEditTodo = useSelector((store) => store.loaders.isLoadingEditTodo);

	useEffect(() => setTextArea(todo ? todo.title : ''), [todo]); // Нужен что бы обновлять textArea так как его значение тянется из запроса на уровень выше

	const onChangeTextArea = ({ target }) => {
		if (todo) {
			setTextArea(target.value);
		}
	};

	const handleSabmit = async (e) => {
		e.preventDefault();
		const editedTodo = { ...todo, title: textArea };
		dispatch(changeIsLoadingEditTodo(true));
		const statusEdit = await requestEditTodo(editedTodo);
		if (statusEdit) {
			dispatch(editTodo(editedTodo));
			dispatch(changeIsLoadingEditTodo(false));
			navigate('/', { replace: true });
		} else {
			dispatch(changeIsLoadingEditTodo(false));
			navigate('/action-failed-page', { replace: true });
		}
	};

	return (
		<form className="todo-page-form" onSubmit={handleSabmit}>
			<textarea
				name="textArea"
				rows="10"
				value={textArea}
				onChange={onChangeTextArea}
			/>
			{isLoadingEditTodo ? (
				<span className="loader loader-edit-button" />
			) : (
				<button
					className="todo-page-confirm-btn"
					type="submit"
					disabled={textArea === '' || (todo && todo.title === textArea)}
				>
					Применить
				</button>
			)}
		</form>
	);
};
