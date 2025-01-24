import './MainPage.css';
import { useState } from 'react';
import { SearchAndSort, ListTodos, Modal, FormAddTodo } from '../../components';
import { useTodos } from '../../hooks';
import { TodoLayout } from '../../Layouts';

export const MainPage = () => {
	const { todos, isLoading } = useTodos();
	const [isLoadingAddTodo, setIsLoadingAddTodo] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		if (!isLoadingAddTodo) {
			setIsModalOpen(false);
		}
	};

	const handleClickAdd = () => {
		if (!isLoading) {
			setIsModalOpen(true);
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
					<ListTodos todos={todos} />
				)}
			</TodoLayout>
			<button className="btn-add-todo" onClick={handleClickAdd}>
				+
			</button>
			<Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
				<FormAddTodo
					setIsModalOpen={setIsModalOpen}
					isLoadingAddTodo={isLoadingAddTodo}
					setIsLoadingAddTodo={setIsLoadingAddTodo}
				/>
			</Modal>
		</>
	);
};
