import { FC, HTMLAttributes } from 'react';
import * as ReactDOM from 'react-dom';
import modalOverlayStyles from '././modal-overlay.module.css';

type TModalProps = {
    onClose: Function;
} & HTMLAttributes<HTMLElement>;

const ModalOverlay: FC<TModalProps> = ({ children, onClose }) => {
    const modalRoot = document.getElementById("burger-modals") as HTMLElement;

    return ReactDOM.createPortal(
        (
            <div className={modalOverlayStyles.modalOverlay} onClick={() => onClose()}>
                {children}
            </div>
        ),
        modalRoot
    );
}
export default ModalOverlay;