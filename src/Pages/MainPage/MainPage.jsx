import './MainPage.css';
import { useEffect, useState } from 'react';
import { SearchAndSort, ListTodos, Modal, FormAddTodo } from '../../components';
import { TodoLayout } from '../../Layouts';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetTodos } from '../../hooks';
import { addListTodos, modalOpen, modalClose } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAddTodo, setIsLoadingAddTodo] = useState(false);

	const todos = useSelector((store) => store.todos);
	const isModalOpen = useSelector((store) => store.modal);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const requestTodos = async () => {
			setIsLoading(true);

			const listTodos = await requestGetTodos();

			if (listTodos) {
				dispatch(addListTodos(listTodos));
				setIsLoading(false);
			} else {
				setIsLoading(false);
				navigate('/loading-error-page', { replace: true });
			}
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
				<FormAddTodo
					isLoadingAddTodo={isLoadingAddTodo}
					setIsLoadingAddTodo={setIsLoadingAddTodo}
				/>
			</Modal>
		</>
	);
};
