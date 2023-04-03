import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import modalOverlayStyles from '././modal-overlay.module.css';

const ModalOverlay = ({ children, onClose }) => {
    const modalRoot = document.getElementById("burger-modals");

    useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.keyCode === 27) {
                onClose();
            }
        }
        window.addEventListener('keydown', closeOnEsc)
        return () => window.removeEventListener('keydown', closeOnEsc)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ReactDOM.createPortal(
        (
            <div className={modalOverlayStyles.modalOverlay} onClick={onClose}>
                {children}
            </div>
        ),
        modalRoot
    );
}
export default ModalOverlay;

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
}