import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory, deleteThisProduct, clearProduct } from '../../store/reducers1/adminReducer';


function ProductList() {
    const dispatch = useDispatch()
    const inventory = useSelector((state) => state.products);

    console.log('PRODUCT LIST', inventory);

    useEffect(() => {
        dispatch(fetchInventory());
        dispatch(clearProduct())
    }, []);
    

    return (
        
         <div className='product-list-wrap'>
            {inventory ? inventory.map((product) => (
                <div className='product-list-container' key={`${product.id}`}>
                    <h3>Product Id: {product.id}</h3>
                    <img src={`${product.image}`} />
                    <h3>{product.title}</h3>
                    <h3>${product.price}</h3>
                    <p>{product.description}</p>
                    <button onClick={() => dispatch(deleteThisProduct(product.id))}>Delete Product</button>
                    </div>
                    ))
                :null}
            </div>
        
    )
};

export default ProductList;