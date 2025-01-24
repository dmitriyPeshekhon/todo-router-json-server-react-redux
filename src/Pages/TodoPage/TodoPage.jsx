import './TodoPage.css';
import deletePng from '../../assets/delete.png';
import back from '../../assets/back.png';
import { useTodos } from '../../hooks';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormEditTodo } from '../../components';
import { TodoLayout } from '../../Layouts';

export const TodoPage = () => {
	const [todo, setTodo] = useState(null);
	const [isLoadingButtons, setIsLoadingButtons] = useState(false);

	const { isLoading, handleGetTodoById, handleDeleteTodo, handleEditTodo } = useTodos();

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const getTodo = async () => {
			setTodo(await handleGetTodoById(id));
		};
		getTodo();
	}, []);

	const handleClickDelete = async () => {
		if (!isLoadingButtons) {
			setIsLoadingButtons(true);
			await handleDeleteTodo(id);
			setIsLoadingButtons(false);
			navigate('/', { replace: true });
		}
	};

	return (
		<TodoLayout>
			{isLoading ? (
				<div className="loader-container">
					<span className="loader" />
				</div>
			) : (
				<div className="container-todo-page">
					<header className="container-back-delete-btn">
						<Link className="img-container-btn" to="/">
							<img className="img-btn" src={back} alt="delete" />
						</Link>
						{isLoadingButtons ? (
							<span className="loader loader-delete-button" />
						) : (
							<div className="img-container-btn">
								<img
									className="img-btn"
									src={deletePng}
									alt="delete"
									onClick={handleClickDelete}
								/>
							</div>
						)}
					</header>
					<FormEditTodo
						todo={todo}
						isLoadingButtons={isLoadingButtons}
						setIsLoadingButtons={setIsLoadingButtons}
						handleEditTodo={handleEditTodo}
					/>
				</div>
			)}
		</TodoLayout>
	);
};
