import React from 'react';
import Product from './Product';

const Products = (props) => (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Look at these magnificent products!</h3>
            </div>
            
            {props.products.length === 0 && <p className="widget__message">There are no products registered.</p>}
            {
                props.products.map((product, index) => (
                    <Product
                        productIndex={index}
                        id={product.id}
                        productName={product.productName}
                        picture={product.image}
                        price={product.cost}
                        tags={product.tags}
                        category={product.category}
                        handleOpenEditProduct={props.handleOpenEditProduct}
                        handleRemoveProduct={props.handleRemoveProduct}
                    />
                ))
            }
        </div>
    );

export default Products;