import React from 'react';

const AddProduct = (props) => (
    <div className="container addBtnSection">
        <button className="addBtn"
            onClick={props.handleOpenAddProduct}
        >
            Add Product
        </button>
    </div>
);

export default AddProduct;