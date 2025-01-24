import './ListTodos.css';

export const Checkbox = ({ checked, isDisabled, onChange }) => {
	return (
		<div className="container-checkbox">
			{isDisabled ? (
				<span className="loader loader-check-box" />
			) : (
				<input
					className="toggle-todo"
					type="checkbox"
					checked={checked}
					onChange={onChange}
				/>
			)}
		</div>
	);
};
