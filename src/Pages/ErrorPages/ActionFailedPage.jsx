import './ErrorPages.css';
import errorPng from '../../assets/error.png';
import { useNavigate } from 'react-router-dom';

export const ActionFailedPage = () => {
	const navigate = useNavigate();

	const handleGoHome = () => navigate('/', { replace: true });

	return (
		<div className="container-error-page">
			<img className="error-img" src={errorPng} alt="error" />
			<h1 className="text-error-page">Не удалось выполнить действие над задачей</h1>
			<button className="todo-page-confirm-btn" onClick={handleGoHome}>
				На главную
			</button>
		</div>
	);
};
