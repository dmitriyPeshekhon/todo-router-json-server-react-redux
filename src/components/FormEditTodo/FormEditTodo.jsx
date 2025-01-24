import './FormEditTodo.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormEditTodo = ({
	todo,
	isLoadingButtons,
	setIsLoadingButtons,
	handleEditTodo,
}) => {
	const [textArea, setTextArea] = useState('');

	const navigate = useNavigate();

	useEffect(() => setTextArea(todo ? todo.title : ''), [todo]); // Нужен что бы обновлять textArea так как его значение тянется из запроса на уровень выше

	const onChangeTextArea = ({ target }) => {
		if (todo) {
			setTextArea(target.value);
		}
	};

	const handleSabmit = async (e) => {
		e.preventDefault();
		setIsLoadingButtons(true);
		await handleEditTodo({ ...todo, title: textArea });
		setIsLoadingButtons(false);
		navigate('/', { replace: true });
	};

	return (
		<form className="todo-page-form" onSubmit={handleSabmit}>
			<textarea
				name="textArea"
				rows="10"
				value={textArea}
				onChange={onChangeTextArea}
			/>
			{isLoadingButtons ? (
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
