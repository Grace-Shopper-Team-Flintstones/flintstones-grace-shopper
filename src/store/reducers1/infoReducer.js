import axios from 'axios';

const SET_INFO = 'SET_INFO';



export const setInfo = (info) => {
    return {
        type: SET_INFO.
        info,
    };
};

export const fetchInfo = (id) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get(`/api/orderInfo/${id}`);
            dispatch(setInfo(data));
        }catch(error){
            console.log('FETCH INFO THUNK ERROR ', error)
        }
    };
};

export default function infoReducer(state= {}, action){
    switch(action.type){
        case SET_INFO:
            return{
                accountInfo: action.info,
                productInfo: action.info.products,
            };
        default:
            return state;
    }
}