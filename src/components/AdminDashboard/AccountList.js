import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, deleteThisAccount, clearAccount } from '../../store/reducers1/adminReducer';

const AccountList = () => {
    const dispatch = useDispatch()
    const accounts = useSelector((state) => state.accounts);

    console.log('account LIST', inventory);

    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(clearAccount())
    }, []);
    

    return (
        
         <div className='account-list-wrap'>
            {accounts ? accounts.map((account) => (
                <div className='account-list-container' key={`${account.id}`}>
                    <h3>account Id: {account.id}</h3>
                    <h3>{account.firstName} {account.lastName}</h3>
                    <h3>${account.email}</h3>
                    <p>{account.address}</p>
                    <button onClick={() => dispatch(deleteThisAccount(account.id))}>Delete account</button>
                    </div>
                    ))
                :null}
            </div>
        
    )
};
};

export default AccountList;