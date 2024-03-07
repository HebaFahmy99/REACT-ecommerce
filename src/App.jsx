import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Brands from './Components/Brands/Brands';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ProductsPerBrand from './Components/ProductsPerBrand/ProductsPerBrand';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Profile from './Components/Profile/Profile';
import Cart from './Components/Cart/Cart';
import CartContextProvider from './Context/CartContextProvider';

function App() { 
 
  const [currUser, setCurrUser] = useState(null);  
  
  //functional component must starts with capital letter and return jsx code
  function ProtectedRoute({children}){ 
    if(currUser === null && localStorage.getItem('tkn') === null){ 
      return <Navigate to={'/login'}/>
    }else{ 
      return <> 
        {children}
      </>
    }
  }


  function getUserData(){  
    const userData  = jwtDecode(localStorage.getItem('tkn'));  
    setCurrUser(userData); 
  }

  function clearUserData(){ 
    localStorage.removeItem('tkn') 
    setCurrUser(null);
  }

  useEffect(function(){   
    //solve reload problem 
    if(localStorage.getItem('tkn') != null && currUser == null){ 
      getUserData();
    }

  },[])
  const router = createBrowserRouter([ 
    {path:'', element:<Layout currUser={currUser} clearUserData={clearUserData} />, children:[ 
      {path:'', element: <CartContextProvider><Home/></CartContextProvider>}, 
      {path:'home', element: <CartContextProvider><Home/></CartContextProvider>},  
      {path:'productdetails/:id', element:<ProtectedRoute><CartContextProvider><ProductDetails/></CartContextProvider></ProtectedRoute>},   
      {path:'profile', element:<ProtectedRoute><Profile currUser={currUser} /></ProtectedRoute>}, 
      {path:'brands',element:<Brands/>},  
      {path:'cart',element:<ProtectedRoute><CartContextProvider><Cart/></CartContextProvider></ProtectedRoute>},
      {path:'productsperbrand/:id',element:<ProductsPerBrand/>},
      {path:'login', element: <Login getUserData={getUserData} />}, 
      {path:'register', element:<Register/>}, 
      {path:'*', element: <NotFound/>}
    ]}


  ])

  return <> 
    <RouterProvider router={router}/>

  </>
}
export default App;
