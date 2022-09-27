import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import ModifyProduct from './ModifyProduct';
import AddAccount from './AddAccount';
import AccountList from './AccountList';
import ModifyAccount from './ModifyAccount';


const ProductsAndAccounts = () => {
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [listProduct, setListProduct] = useState(false);
    const [addAccount, setAddAccount] = useState(false);
    const [editAccount, setEditAccount] = useState(false);
    const [listAccount, setListAccount] = useState(false);

    return (
        <div>
            <div className='edit-product-menu-container'>
                <h1>Welcome Admin</h1>
                <button onClick={() => setAddProduct(!addProduct)}>Add A Product</button>
                {addProduct ? <AddProduct /> : <></>}
                <button onClick={() => setEditProduct(!editProduct)}>Edit A Product</button>
                {editProduct ? <ModifyProduct /> : <></>}
                <button onClick={() => setListProduct(!listProduct)}>Product List</button>
                {listProduct ? <ProductList /> : <></>}
                <button onClick={() => setAddAccount(!addAccount)}>Add An Account</button>
                {addAccount ? <AddAccount /> : <></>}
                <button onClick={() => setEditAccount(!editAccount)}>Edit An Account</button>
                {editAccount ? <ModifyAccount /> : <></>}
                <button onClick={() => setListAccount(!listAccount)}>Account List</button>
                {listAccount ? <AccountList /> : <></>}
            </div>
        </div>
    )
}

export default ProductsAndAccounts;