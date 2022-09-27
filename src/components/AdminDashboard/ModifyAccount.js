import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccount, fetchSingleAccount } from '../../store/reducers1/adminReducer'
import { useParams } from 'react-router-dom';
// import { produceWithPatches } from 'immer';

function ModifyAccount() {
    const dispatch = useDispatch()
    const params = useParams()

    const account = useSelector((state) => state.account);

    useEffect(() => {
        if(!isNaN(params.id));
        dispatch(fetchSingleAccount(params.id));
    }, []);

    const [ form, setForm ] = useState({
        firsName: '',
        lastName:'',
        email: '',
        address: '',
    });

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateAccount({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            address: form.address,
        }, params.id, account));
    };

    useEffect(() => {
        if(!isNaN(params.id))
        dispatch(fetchSingleAccount(params.id));
    }, []);

    useEffect(() => {
        setForm({
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            address: account.address,
        }, [account])
    })

    return (
        <>

            <div className='edit-container'>
                <h2>Edit Account</h2>
                <form onSubmit={handleSubmit}>
                   <label htmlFor='firstName'>firstName:</label>
                    <input name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>
                    <label htmlFor='lastName'>lastName:</label>
                    <input name='lastName' value={form.lastName} onChange={handleChange('lastName')} />
                    <label htmlFor='email'>email:</label>
                    <input name='email' value={form.email} onChange={handleChange('email')} />
                    <label htmlFor='address'>address:</label>
                    <input name='address' value={form.address} onChange={handleChange('address')} />
                    <button type='submit'>Edit Product</button>
                </form>
            </div>
        </>
    )
}

export default ModifyAccount;