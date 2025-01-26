import './Modal.css';
import closePng from '../../assets/close.png';

export const Modal = ({ isModalOpen, onClose, children }) => {
	return isModalOpen ? (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-window" onClick={(e) => e.stopPropagation()}>
				<div className="img-container-btn" onClick={onClose}>
					<img className="img-btn" src={closePng} alt="delete" />
				</div>
				{children}
			</div>
		</div>
	) : null;
};
