import './TodoPage.css';
import deletePng from '../../assets/delete.png';
import back from '../../assets/back.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FormEditTodo } from '../../components';
import { TodoLayout } from '../../Layouts';
import { useSelector, useDispatch } from 'react-redux';
import {
	changeIsLoading,
	setTodo,
	changeIsLoadingEditTodo,
	deleteTodo,
} from '../../redux/actions';
import { requestGetTodo, requestDeleteTodo } from '../../hooks';

export const TodoPage = () => {
	const isLoading = useSelector((store) => store.loaders.isLoading);
	const isLoadingEditTodo = useSelector((store) => store.loaders.isLoadingEditTodo);

	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const getTodo = async () => {
			dispatch(changeIsLoading(true));
			const todo = await requestGetTodo(id);
			if (todo) {
				dispatch(setTodo(todo));
				dispatch(changeIsLoading(false));
			} else {
				dispatch(changeIsLoading(false));
				navigate('/loading-error-page', { replace: true });
			}
		};
		getTodo();
	}, []);

	const handleClickDelete = async () => {
		if (!isLoadingEditTodo) {
			dispatch(changeIsLoadingEditTodo(true));
			const statusDelete = await requestDeleteTodo(id);
			if (statusDelete) {
				dispatch(deleteTodo(id));
				dispatch(changeIsLoadingEditTodo(false));
				navigate('/', { replace: true });
			} else {
				dispatch(changeIsLoadingEditTodo(false));
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
					<FormEditTodo />
				</div>
			)}
		</TodoLayout>
	);
};
