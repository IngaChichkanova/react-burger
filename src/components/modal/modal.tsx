import { useEffect, FC, HTMLAttributes } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '././modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ESC_KEYCODE } from '../../utils/constants';

type TModalProps = {
    onClose: Function;
} & HTMLAttributes<HTMLHtmlElement>;

const Modal: FC<TModalProps> = ({ children, onClose }) => {

    const handleClose = (): void => {
        onClose();
    }

    useEffect(() => {
        const closeOnEsc = (event: { keyCode: number }) => {
            if (event.keyCode === ESC_KEYCODE) {
                handleClose();
            }
        }
        window.addEventListener('keydown', closeOnEsc)
        return () => window.removeEventListener('keydown', closeOnEsc)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ModalOverlay onClose={onClose}>
            <div onClick={e => e.stopPropagation()} className={`${modalStyles.modal}`}>
                <div data-testid="close-modal" className={`${modalStyles.close} mt-10 mr-10`}><CloseIcon onClick={handleClose} type="primary" /></div>
                {children}
            </div>
        </ModalOverlay>
    );
}

export default Modal;