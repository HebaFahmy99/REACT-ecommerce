import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';

function Brands(props) { 
    const [allBrands, setAllBrands]= useState(null);

    async function getAllBrands(){ 
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands'); 
        setAllBrands(data.data);
    }

    useEffect(function(){ 
        getAllBrands();
    },[])

    return <> 
    {allBrands? <div className="container p-4">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-3">
                   <div>
                        <h3 className='text-primary bold'>Our brands</h3>  
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, nesciunt.</p>
                   </div>
                </div> 
                {allBrands.map(function(brand, idx){  
                   return <div className="col-md-3" key={idx}>
                    <Link className='nav-link' to={`/productsperbrand/${brand._id}`}> 
                        <div className="brand">
                            <img src={brand.image} className='w-100' alt={brand.name} srcset="" /> 
                            <h6 className='text-center text-primary'>{brand.name}</h6> 
                        </div>
                    </Link>
                </div>})}
            </div>
        </div> : <LoadingScreen/>}
    
    
    </>
}

export default Brands;