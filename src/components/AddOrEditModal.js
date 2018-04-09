import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default class AddOrEditModal extends React.Component {

    state = {    // these properties are temporary, used to pass to the main component for the main state info
        id: '',
        productName: '',
        image: '',
        cost: undefined,
        category: '',
        tags: [],

        didEditSomething: false, // checking if there was at least one edit, or will simple will close Modal

        file: null
    };

    // Methods to get the values from the inputs and add
    // to the state of this component in specific (above)

    // Later on, through the Confirmation Methods, these info will be
    //added to the state of the main component (ProductListApp.js)


    productNameChange = (e) => {
        if (!this.props.addProductModal) {
            if (!this.state.didEditSomething) { // for the first edition, register all the info from the inputs
                this.setState({
                    productName: e.target.value,
                    cost: this.props.arrayToEdit[1],
                    category: this.props.arrayToEdit[2],
                    tags: this.props.arrayToEdit[3],
                    didEditSomething: true
                })
            } else {
                this.setState({
                    productName: e.target.value
                })
            }
        } else {
            this.setState({
                productName: e.target.value
            })
        }
    }
    
    costChange = (e) => {
        let pureNumbers = (Number(e.target.value.replace(/[^0-9]/g, ''))/100)
        if (!this.props.addProductModal) {
            if (!this.state.didEditSomething) { // for the first edition, register all the info from the inputs
                e.target.value = (Number(e.target.value.replace(/[^0-9]/g, ''))/100).toLocaleString("en-US", {style:"currency", currency:"USD"});
                this.setState({
                    cost: pureNumbers,
                    productName: this.props.arrayToEdit[0],
                    category: this.props.arrayToEdit[2],
                    tags: this.props.arrayToEdit[3],
                    didEditSomething: true
                })
            } else {
                e.target.value = (Number(e.target.value.replace(/[^0-9]/g, ''))/100).toLocaleString("en-US", {style:"currency", currency:"USD"});
                this.setState({
                    cost: pureNumbers
                })
            }
        } else {
            e.target.value = (Number(e.target.value.replace(/[^0-9]/g, ''))/100).toLocaleString("en-US", {style:"currency", currency:"USD"});
            this.setState({
                cost: pureNumbers
            })
        }
    }

    categoryChange = (e) => {
        if (!this.props.addProductModal) {
            if (!this.state.didEditSomething) { // for the first edition, register all the info from the inputs
                this.setState({
                    category: e.target.value,
                    productName: this.props.arrayToEdit[0],
                    cost: this.props.arrayToEdit[1],
                    tags: this.props.arrayToEdit[3],
                    didEditSomething: true
                })
            } else {
                this.setState({
                    category: e.target.value
                })
            }
        } else {
            this.setState({
                category: e.target.value
            })
        }
    }

    tagsChange = (e) => {
        if (!this.props.addProductModal) {
            if (!this.state.didEditSomething) { // for the first edition, register all the info from the inputs
                this.setState({
                    tags: e.target.value.split(", "),
                    productName: this.props.arrayToEdit[0],
                    cost: this.props.arrayToEdit[1],
                    category: this.props.arrayToEdit[2],
                    didEditSomething: true
                })
            } else {
                this.setState({
                    tags: e.target.value.split(", ")
                })
            }
        } else {
            this.setState({
                tags: e.target.value.split(", ")
            })
        }
    }

    // Confirmation Methods

    handleConfirmAddProduct = (e) => {
        e.preventDefault();
        // this.uploadHandler();
            const newProduct = {
                id: '',
                productName: this.state.productName,
                image: '',
                cost: this.state.cost,
                category: this.state.category,
                tags: this.state.tags
            };
            this.props.products.push(newProduct);
            this.props.handleClearModal();
    }

    handleConfirmEditProduct = (e) => {
        e.preventDefault();
        // this.uploadHandler();
        if (this.state.didEditSomething) {
        const edited = [
            this.state.productName,
            this.state.cost,
            this.state.category,
            this.state.tags
        ]
        this.setState({
            didEditSomething: false
        })
        this.props.handleEditCompletion(edited);
        } else {
            this.props.handleClearModal()
        }
    }

    // UPLOAD IMG FILES - W/ AXIOS
    // NOT WORKING BCAUSE DID NOT CONFIG URL TO STORE THEM

    /* fileChangedHandler = (e) => {
        this.setState({file: e.target.files[0]})
        console.log(this.state.selectedFile)
    }
      
    uploadHandler = () => { 
        this.fileUpload(this.state.file)
    }
    fileUpload(file){
        const url = '**URL**';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
    } */

    render() {
        return (
            <Modal
            isOpen={this.props.modalActivated}
            onRequestClose={this.props.handleClearModal}
            contentLabel="Product"
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">{this.props.addProductModal ? 'Add a Product' : 'Edit a Product'}</h3>
            <form onSubmit={this.props.addProductModal ? this.handleConfirmAddProduct : this.handleConfirmEditProduct}>
                Title<br />
                    <input
                        type='text'
                        name='title'
                        placeholder="White hat"
                        defaultValue={this.props.editProductModal ? this.props.arrayToEdit[0] : ""}
                        required
                        onChange={this.productNameChange}
                    /><br />
                Price <br />
                    <input
                        type='text'
                        name='cost'
                        placeholder="19.90"
                        defaultValue={this.props.editProductModal ? (this.props.arrayToEdit[1].toFixed(0)/100).toLocaleString("en-US", {style:"currency", currency:"USD"}) : ""}
                        required
                        maxlength="14"
                        onChange={this.costChange}
                    /><br />
                Category<br />
                    <input
                        type='text'
                        name='category'
                        placeholder="acessories"
                        defaultValue={this.props.editProductModal ? this.props.arrayToEdit[2] : ""}
                        required
                        onChange={this.categoryChange}
                    /><br />
                Tags<br />
                    <input
                        type='text'
                        name='tags'
                        placeholder="tag1, tag2"
                        defaultValue={this.props.editProductModal ? (this.props.arrayToEdit[3]).toString().replace(/,/g, ', ') : ""}
                        onChange={this.tagsChange}
                    /><br/>
                    <div className="file-input-wrapper">
                        <button className="btn-file-input">Upload Image</button>
                        <input type="file" name="file" onChange={this.fileChangedHandler} accept="image/png, image/jpeg" />
                    </div>
                <button className="saveAndCancelBtn saveBtn">Save</button>
            </form>
            <button className="saveAndCancelBtn" onClick={this.props.handleClearModal}>Cancel</button>
        </Modal>
        );
    }
};