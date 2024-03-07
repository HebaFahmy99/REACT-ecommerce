import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Assets/freshcart-logo.svg'; 
import Styles from './Navbar.module.css';


function Navbar({currUser, clearUserData}) { 

  const router = useNavigate();

  function Logout(){ 
    clearUserData() 
    router('/login')
  } 


return <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
  <img src={logo} alt="logo" srcset="" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"> 
          <Link className="nav-link" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to="/cart">Cart</Link>
        </li> 
      </ul>
    </div>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 

        {currUser?<>  
          <li className="nav-item">
          <Link  className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="nav-item" onClick={Logout}>
          <span className="nav-link">Logout</span>
        </li> 
        </> : <> 
        <li className="nav-item">
          <Link  className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to="/register">Register</Link>
        </li>      
        </>}

        

       
      </ul>
      
    </div>
  </div>
</nav>
    
    
    </>
}

export default Navbar;