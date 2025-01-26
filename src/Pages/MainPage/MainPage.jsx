import './MainPage.css';
import { useEffect } from 'react';
import { SearchAndSort, ListTodos, Modal, FormAddTodo } from '../../components';
import { TodoLayout } from '../../Layouts';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetTodos } from '../../hooks';
import {
	addListTodos,
	changeIsLoading,
	modalOpen,
	modalClose,
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
	const todos = useSelector((store) => store.todos);
	const isLoading = useSelector((store) => store.loaders.isLoading);
	const isLoadingAddTodo = useSelector((store) => store.loaders.isLoadingAddTodo);
	const isModalOpen = useSelector((store) => store.modal);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const requestTodos = async () => {
			dispatch(changeIsLoading(true));

			const listTodos = await requestGetTodos();

			if (listTodos) {
				dispatch(addListTodos(listTodos));
			} else {
				dispatch(changeIsLoading(false));
				navigate('/loading-error-page', { replace: true });
			}

			dispatch(changeIsLoading(false));
		};
		if (todos.length === 0) {
			requestTodos();
		}
	}, []);

	const handleCloseModal = () => {
		if (!isLoadingAddTodo) {
			dispatch(modalClose);
		}
	};

	const handleClickAdd = () => {
		if (!isLoading) {
			dispatch(modalOpen);
		}
	};

	return (
		<>
			<SearchAndSort />
			<TodoLayout>
				{isLoading ? (
					<div className="loader-container">
						<span className="loader" />
					</div>
				) : (
					<ListTodos />
				)}
			</TodoLayout>
			<button className="btn-add-todo" onClick={handleClickAdd}>
				+
			</button>
			<Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
				<FormAddTodo />
			</Modal>
		</>
	);
};
