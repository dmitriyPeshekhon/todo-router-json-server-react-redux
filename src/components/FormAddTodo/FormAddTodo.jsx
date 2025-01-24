import './FormAddTodo.css';
import { useState } from 'react';
import { useTodos } from '../../hooks';

export const FormAddTodo = ({
	setIsModalOpen,
	isLoadingAddTodo,
	setIsLoadingAddTodo,
}) => {
	const [textArea, setTextArea] = useState('');

	const { handleAddTodo } = useTodos();

	const handleTextareaChange = ({ target }) => {
		setTextArea(target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoadingAddTodo(true);
		await handleAddTodo(textArea);
		setIsLoadingAddTodo(false);
		setIsModalOpen(false);
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
