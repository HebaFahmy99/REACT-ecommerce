import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function ProductsPerBrand(props) { 

    const {id} = useParams(); 
    const [allProducts, setAllProducts] = useState(null);
    async function getProductsPerBrand(){ 
       try{ 
        const {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/products',  
            { 
                params:{'brand': id }
            }) 

            // console.log(data.data);  
            setAllProducts(data.data);

       }catch(err){ 
        console.log(err);
       }
    } 

    useEffect(function(){ 
        getProductsPerBrand()
    },[])

    return <> 
       {allProducts?  <div className="container p-4">
            <div className="row">
                    {allProducts.length === 0? <div className='vh-100 d-flex justify-content-center align-items-center'><h1 className='p-5 text-center text-primary'>Sorry! <br/> No Products Avaliable right now..</h1></div> : 
                    allProducts.map(function(product,idx){ 
                        return     <div className="col-md-3"  key={idx}>
                         <div className="product bg-primary rounded-3 ">
                            <img src={product.imageCover} className='w-100' alt={product.title} srcset="" />

                            <div className="p-2">
                                <p>{product.title}</p> 
                                <span className=''>Price: {product.price} EGY</span>
                            </div>
                        </div>
                    </div>
                    })
                    }

            </div>
        
        </div>    : <LoadingScreen/>}
    
    
    
    
    </>
}

export default ProductsPerBrand;