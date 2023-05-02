import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '././modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ESC_KEYCODE } from '../../utils/constants';

const Modal = ({ children, onClose }) => {

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.keyCode === ESC_KEYCODE) {
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
                <div className={`${modalStyles.close} mt-10 mr-10`}><CloseIcon onClick={handleClose} type="primary" /></div>
                {children}
            </div>
        </ModalOverlay>
    );
}

export default Modal;

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
}