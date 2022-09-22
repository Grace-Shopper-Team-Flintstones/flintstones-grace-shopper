import React, { useEffect } from "react";
//import components here
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import AllAlbums from "./components/AllAlbums/AllAlbums";
import AuthdUserHome from "./components/AdminPanelView/AuthdUserHome/AuthdUserHome";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SignUp from "./components/SignUp/SignUp";
import SingleAlbum from "./components/SingleAlbum/SingleAlbum";
import ViewAccount from "./components/ViewAccount/ViewAccount";
import ConfirmationPage from "./components/ConfirmationPage/ConfirmationPage";
import LogIn from './components/LogIn/LogIn';
import AccountNav from './components/AccountNav/AccountNav';
//import { accountLoginAttempt } from './store/reducers1/authReducer';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';


function App() {
    // const dispatch = useDispatch();

    // useEffect (() => {
    //     dispatch(accountLoginAttempt());
    // }, [dispatch]);


    return (

        <div id='main'>
            <NavBar />
            <AccountNav />
            {/*Routes Here*/}
            <Routes>
                {/* <Route path='*' element={<NotFoundPage />} /> */} //TODO: We can comment NotFoundPage back in at the end (easier to debug routes without)
                <Route path='/' element={<LandingPage />} />
                <Route path='/products' element={<AllAlbums />} />
                <Route path='/products/:id' element={<SingleAlbum />} />
                <Route path='/account' element={<ViewAccount />} />
                <Route path='/confirmation' element={<ConfirmationPage />} />
                <Route path='/admin-panel' element={<AuthdUserHome />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/admindashboard' element={<AdminDashboard/>}/>
                
            </Routes>
        </div>

    )
}

export default App;