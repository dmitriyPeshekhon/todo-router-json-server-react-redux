import './ErrorPages.css';
import NotFoundPng from '../../assets/404.png';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
	const navigate = useNavigate();

	const handleGoHome = () => navigate('/', { replace: true });

	return (
		<div className="container-error-page">
			<img className="not-found-img" src={NotFoundPng} alt="error" />
			<h2 className="text-error-page">Такой страницы не существует!</h2>
			<button className="todo-page-confirm-btn" onClick={handleGoHome}>
				На главную
			</button>
		</div>
	);
};
