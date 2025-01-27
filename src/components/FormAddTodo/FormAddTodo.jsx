import './FormAddTodo.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalClose, addTodo } from '../../redux/actions';
import { requestAddTodo } from '../../hooks';

export const FormAddTodo = ({ isLoadingAddTodo, setIsLoadingAddTodo }) => {
	const [textArea, setTextArea] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTextareaChange = ({ target }) => {
		setTextArea(target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoadingAddTodo(true);
		const addiedTodo = await requestAddTodo(textArea);
		setIsLoadingAddTodo(false);
		dispatch(modalClose);
		if (addiedTodo) {
			dispatch(addTodo(addiedTodo));
		} else {
			navigate('/action-failed-page', { replace: true });
		}
	};

	return (
		<form className="form-add-todo" onSubmit={handleFormSubmit}>
			<textarea
				name="titleTodo"
				className="textarea-add-todo"
				rows="3"
				placeholder="Введите вашу задачу..."
				value={textArea}
				onChange={handleTextareaChange}
			></textarea>
			{isLoadingAddTodo ? (
				<span className="loader loader-add-todo" />
			) : (
				<button
					className="btn-modal-window"
					type="submit"
					disabled={textArea === ''}
				>
					Добавить
				</button>
			)}
		</form>
	);
};
