import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout({currUser, clearUserData}) {
    return <> 
    <Navbar currUser={currUser} clearUserData={clearUserData} /> 
    <Outlet /> 
    
    <Footer />
    
    
    </>
}

export default Layout;