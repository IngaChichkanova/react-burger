import React from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '././modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ header, component, onClose }) => {

    return (
        <ModalOverlay onClose={onClose}>
            <main onClick={e => e.stopPropagation()} className={`${modalStyles.modal}`}>
                <section className={`${modalStyles.header}`}>
                    {header.length > 0 && <p className={`${modalStyles.title} pt-2 pb-2 ml-10 mt-10 text text_type_main-large`}>{header}</p>}
                    <div className={`${modalStyles.close} mt-15 mr-10`}><CloseIcon onClick={onClose} type="primary" /></div>
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