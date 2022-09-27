import axios from 'axios';
import  history from '../../utils/history';

const SET_AUTH = 'SET_AUTH';


const setAuth = (auth) =>{
    return{
        type: SET_AUTH,
        auth,
    }
};

const sendAccount = (account) => {
    return {
        type: SEND_ACCOUNT,
        account,
    }
};


export const fetchAccountData = () => {
    return async (dispatch) => {
        try {
           const token = window.localStorage.getItem('token');
           console.log('FETCH TOKEN', token)
            if (token) {
                const res = await axios.get('/auth', {
                    headers: {
                        authorization: token,
                    },
                });
                return dispatch(setAuth(res.data));
            }
        } catch (error) {
            console.log('AUTHUSER THUNK ERROR ', error)
        }
    };
};



export const attemptLogin = (authInfo) => {
    return async(dispatch) => {
        try{
            const res = await axios.post('/auth/login', authInfo);
            console.log('THUNK DATA', res.data)
            window.localStorage.setItem('token', res.data);
            dispatch(fetchAccountData());
            history.push('/');
        }catch(error){
            console.log('ATTEMPT PASSWORD THUNK ERROR ', error);
        }
    }
}

export const createAccount = (authInfo) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/signup', authInfo);
            window.localStorage.setItem('token', res.data.token);
            dispatch(accountAttachCart());
            history.push('/');
        } catch (error) {
            console.log('CREATE ACCOUNT THUNK ERROR ', error);
        }
    }
}

export const logoutAccount = () => {
    return(dispatch) => {
        window.localStorage.removeItem('token');
        history.push('/');
        return{
            type: SET_AUTH,
            auth: {}
        }
    };   
};


export default function  authReducer (state = {}, action) {
    switch (action.type) {
       case SET_AUTH:
        return action.auth;
        default:
            return state;
    }
};
//checking merge stuffffss
