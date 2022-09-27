import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../store/reducers1/adminReducer';

const AddProduct = () => {
    const dispatch = useDispatch()
   const [ form, setForm ] = useState({
    title: '',
    price: '',
    stock: '',
    image: '',
    description: '',
   });

   const handleChange = prop => event => {
    setForm({
        ...form,
        [prop]: event.target.value
    })
   };

   const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewProduct({
        title: form.title,
        price: form.price,
        stock: form.stock,
        image: form.image,
        description: form.description,
    }));
   };

   useEffect(() => {
   }, [form])

    return (
        <>
            <div className='add-product-container'>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input 
                    name='title'
                    value={form.title}
                    onChange={handleChange('title')}/>
                    <label htmlFor='price'>Price</label>
                    <input 
                    name='price'
                    value={form.price}
                    onChange={handleChange('price')}/>
                    <label htmlFor='stock'>Stock</label>
                    <input 
                    name='stock'
                    value={form.stock}
                    onChange={handleChange('stock')}/>
                    <label htmlFor='image'>Image</label>
                    <input 
                    name='image'
                    value={form.image}
                    onChange={handleChange('image')}/>
                    <label htmlFor='description'>Description</label>
                    <input 
                    name='description'
                    value={form.description}
                    onChange={handleChange('description')}/>
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </>
    )
}

export default AddProduct;