import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import modalOverlayStyles from '././modal-overlay.module.css';

const ModalOverlay = ({ children, onClose }) => {
    const modalRoot = document.getElementById("burger-modals");

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