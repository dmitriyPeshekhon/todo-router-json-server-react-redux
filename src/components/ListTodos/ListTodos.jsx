import './ListTodos.css';
import { Todo } from './Todo.jsx';

export const ListTodos = ({ todos }) => {
	return (
		<ul className="ul-list-todos">
			{todos.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</ul>
	);
};
