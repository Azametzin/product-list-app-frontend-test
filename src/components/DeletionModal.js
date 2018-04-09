import React from 'react';
import Modal from 'react-modal';

export default class DeletionModal extends React.Component {

    handleConfirmDeletion = (e) => {
        e.preventDefault();
        const i = this.props.productIndexToRemove;
        this.props.products.splice(i, 1);
        this.props.deletionModal = false;
        this.props.handleClearDelModal();
    }

    render() {
        return (
            <Modal
            isOpen={this.props.deletionModal}
            onRequestClose={this.props.handleClearDelModal}
            contentLabel="Deletion"
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Confirm deletion of <span className="deletionProductHightligh">{this.props.productToRemove}</span> from the Product List?</h3>
            <form onSubmit={this.handleConfirmDeletion}>
                <button className="saveAndCancelBtn">Yes</button>
            </form>
            <button onClick={this.props.handleClearDelModal} className="saveAndCancelBtn">Cancel</button>
        </Modal>
        );
    }
};