import React from 'react';
import AddOrEditModal from './AddOrEditModal';
import AddProduct from './AddProduct';
import DeletionModal from './DeletionModal';
import Header from './Header';
import Products from './Products';

export default class ProductListApp extends React.Component {
    state = {
        products: [
            {
                id: 'unique-id',
                productName: 'South-Brazilian Spiked Boots',
                image: 'spiked-boots.jpg',
                cost: 14255,
                category: 'shoes',
                tags: ['adventure', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion', 'fashion']

            },
            {
                id: 'id-from-mountains',
                productName: 'Long Escalator Rope',
                image: 'escalation-rope.jpg',
                cost: 12900,
                category: 'acessories',
                tags: ['sports', 'adventure', 'mountain'],
            },
            {
                id: 'mystic-id',
                productName: 'Magic Wand (Uncharged)',
                image: 'magic-wand.jpg',
                cost: 9000001,
                category: 'magical',
                tags: ['magic', 'supernatural', 'merlin', 'supernatural', 'merlin', 'supernatural', 'merlin']
            }
        ],

        modalActivated: false, // Conditional to Open or Close Modal

        addProductModal: false, // If the Modal is to -Add- a Product
        editProductModal: false, // If the Modal is to -Edit- a Product
        deletionModal: false, // If the Modal is to -Delete- a Product

        // info for the Editing logic
        productIndexToEdit: undefined,
        arrayToEdit: undefined,

        // info for the Removing logic
        productToRemove: undefined,
        productIndexToRemove: undefined
    }

    handleOpenAddProduct = () => {
        this.setState(() => ({
            modalActivated: true,
            addProductModal: true,
            editProductModal: false,
        }));
        console.log(this.state.modalActivated);
    }

    handleOpenEditProduct = (productIndex) => {
        const editing = [
            this.state.products[productIndex].productName,
            this.state.products[productIndex].cost,
            this.state.products[productIndex].category,
            this.state.products[productIndex].tags
        ];
        this.setState(() => ({
            modalActivated: true,
            addProductModal: false,
            editProductModal: true,
            productIndexToEdit: productIndex,
            arrayToEdit: editing
        }));
        console.log(this.state.productIndexToEdit);
    }

    handleEditCompletion = (edited) => {
        let index = this.state.productIndexToEdit;
        let newWholeProductList = this.state.products; //copy the entire array
        console.log(newWholeProductList);
        newWholeProductList[index].productName = edited[0];
        newWholeProductList[index].cost = Number(edited[1].toString().replace(/[.,\s]/g, ''));
        newWholeProductList[index].category = edited[2];
        newWholeProductList[index].tags = edited[3];

        this.setState(() => ({
            modalActivated: false,
            products: newWholeProductList
        }));
    }

    handleRemoveProduct = (productIndex) => {
        const productTitleToRemove = this.state.products[productIndex].productName;
        this.setState(() => ({
            productToRemove: productTitleToRemove,
            productIndexToRemove: productIndex,
            deletionModal: true
        }));
    }

    // 2 Methods > Sort by --> Category / Tag

    handleSortByCategory = (category) => {
        console.log('handleSortByCategory Method Called! Implement later');
    }

    handleSortByTag = (tag) => {
        console.log('handleSortByTag Method Called! Implement later');
    }

    // 1 Method ---> close the (add or edit) modal 

    handleClearModal = () => {
        this.setState(() => ({ modalActivated: false }));
    }

    handleClearDelModal = () => {
        this.setState(() => ({ deletionModal: false }));
    }

    componentDidMount() {
        console.log(this.state.products);
    }

    componentDidUpdate() {
        console.log(this.state.products);
    }

    render () {
        const subtitle = 'Product List in React';
        console.log(this.state.products);
        return (
            <div>
                <Header subtitle={subtitle} />
                <AddProduct
                    handleOpenAddProduct={this.handleOpenAddProduct}
                />
                <div className="container">
                    <div className="widget">
                            <Products
                                products={this.state.products}
                                handleOpenEditProduct={this.handleOpenEditProduct}
                                handleRemoveProduct={this.handleRemoveProduct}
                            />
                    </div> 
                </div>
                <AddOrEditModal // The main Modal with a lot of props passed in
                    products={this.state.products}
                    arrayToEdit={this.state.arrayToEdit}
                    modalActivated={this.state.modalActivated}
                    addProductModal={this.state.addProductModal}
                    editProductModal={this.state.editProductModal}
                    handleClearModal={this.handleClearModal}
                    handleOpenAddProduct={this.handleOpenAddProduct}
                    handleOpenEditProduct={this.handleOpenEditProduct}
                    productIndexToEdit={this.productIndexToEdit}
                    handleEditCompletion={this.handleEditCompletion}
                />
                 <DeletionModal // The Deletion Modal
                    productToRemove={this.state.productToRemove}
                    productIndexToRemove={this.state.productIndexToRemove}
                    deletionModal={this.state.deletionModal}
                    products={this.state.products}
                    handleClearDelModal={this.handleClearDelModal}
                 />
            </div>
        );
    }
}