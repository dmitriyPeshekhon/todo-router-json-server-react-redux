import './FormAddTodo.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeIsLoadingAddTodo, modalClose, addTodo } from '../../redux/actions';
import { requestAddTodo } from '../../hooks';

export const FormAddTodo = () => {
	const [textArea, setTextArea] = useState('');
	const isLoadingAddTodo = useSelector((store) => store.loaders.isLoadingAddTodo);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTextareaChange = ({ target }) => {
		setTextArea(target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		dispatch(changeIsLoadingAddTodo(true));
		const addiedTodo = await requestAddTodo(textArea);
		dispatch(changeIsLoadingAddTodo(false));
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
