import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MainPage, TodoPage, ActionFailedPage, LoadErrorPage, Page404 } from '../Pages';
import { TodosProvider } from '../hooks';

export const App = () => {
	return (
		<div className="container">
			<div className="tablo-container">
				<TodosProvider>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/todo/:id" element={<TodoPage />} />
						<Route path="/loading-error-page" element={<LoadErrorPage />} />
						<Route
							path="/action-failed-page"
							element={<ActionFailedPage />}
						/>
						<Route path="/404" element={<Page404 />} />
						<Route path="*" element={<Navigate to="/404" />} />
					</Routes>
				</TodosProvider>
			</div>
		</div>
	);
};
