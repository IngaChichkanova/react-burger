import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '././modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ECK_KEYCODE } from '../../utils/constants';

const Modal = ({ header, component, onClose }) => {

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.keyCode === ECK_KEYCODE) {
                handleClose();
            }
        }
        window.addEventListener('keydown', closeOnEsc)
        return () => window.removeEventListener('keydown', closeOnEsc)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ModalOverlay onClose={onClose}>
            <main onClick={e => e.stopPropagation()} className={`${modalStyles.modal}`}>
                <section className={`${modalStyles.header}`}>
                    {header.length > 0 && <p className={`${modalStyles.title} pt-2 pb-2 ml-10 mt-10 text text_type_main-large`}>{header}</p>}
                    <div className={`${modalStyles.close} mt-15 mr-10 ${header.length > 0 ? "" : "mb-9"}`}><CloseIcon onClick={handleClose} type="primary" /></div>
                </section>
                {component}
            </main>
        </ModalOverlay>
    );
}

export default Modal;

Modal.defaultProps = {
    header: ""
}

Modal.propTypes = {
    header: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}