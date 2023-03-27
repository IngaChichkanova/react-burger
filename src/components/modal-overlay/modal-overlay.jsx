import React from 'react';
import modalOverlayStyles from '././modal-overlay.module.css';

class ModalOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <main className={modalOverlayStyles.overlay}>

            </main>
        );
    }
}

export default ModalOverlay;