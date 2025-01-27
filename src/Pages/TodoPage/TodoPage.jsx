import './TodoPage.css';
import deletePng from '../../assets/delete.png';
import back from '../../assets/back.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormEditTodo } from '../../components';
import { TodoLayout } from '../../Layouts';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../redux/actions';
import { requestGetTodo, requestDeleteTodo } from '../../hooks';

export const TodoPage = () => {
	const [todo, setTodo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingEditTodo, setIsLoadingEditTodo] = useState(false);

	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const getTodo = async () => {
			setIsLoading(true);
			const responseTodo = await requestGetTodo(id);
			if (responseTodo) {
				setTodo(responseTodo);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				navigate('/loading-error-page', { replace: true });
			}
		};
		getTodo();
	}, []);

	const handleClickDelete = async () => {
		if (!isLoadingEditTodo) {
			setIsLoadingEditTodo(true);
			const statusDelete = await requestDeleteTodo(id);
			if (statusDelete) {
				dispatch(deleteTodo(id));
				setIsLoadingEditTodo(false);
				navigate('/', { replace: true });
			} else {
				setIsLoadingEditTodo(false);
				navigate('/action-failed-page', { replace: true });
			}
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
						{isLoadingEditTodo ? (
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
						isLoadingEditTodo={isLoadingEditTodo}
						setIsLoadingEditTodo={setIsLoadingEditTodo}
					/>
				</div>
			)}
		</TodoLayout>
	);
};
