import React from 'react';

const Product = (props) => (
        <div className="product">
            <div className="product__title">
                {props.productName}
            </div>

            <div className="product__image-and-info">
                <div><img src={"images/" + props.picture} /></div>
                <div>
                    <div className="product__price">$ {(props.price/100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</div>
                    <div className="product__category-and-tags">
                        <div className="categorySection">Category: <span className="product__category">{props.category}</span></div>
                        <div className="tagsSection">Tags:{props.tags.map((tag, index) => (<span className="product__tag"> #{tag}</span>))}</div>
                    </div>
                    <div className="productBtn">
                        <button onClick={(e) => props.handleOpenEditProduct(props.productIndex)}>Edit</button>
                        <button onClick={(e) => props.handleRemoveProduct(props.productIndex)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
);

export default Product;