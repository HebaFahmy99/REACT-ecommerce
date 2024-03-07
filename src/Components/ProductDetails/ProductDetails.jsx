import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';
import { CartStoreContext } from './../../Context/CartContextProvider'; 
import $ from "jquery";

function ProductDetails(props) {  
    const {AddProductToCart,RemoveCartItem} = useContext(CartStoreContext)
    const {id} = useParams(); 
    const [product,setProduct] = useState(null);
    async function getProductDetails(){ 
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProduct(data.data); 
    }  
 

    async function AddProduct(pId){ 
        if(await AddProductToCart(pId) === true){ 
            $('.successMsg').fadeIn(1000,function(){ 
                setTimeout(() => {
                    $('.successMsg').fadeOut(1000);
                }, 2000);
            }) 
 
            $('#addProductBtn').fadeOut(500);
            $('#removeProductBtn').fadeIn(1000);
        }
    } 

    async function removeProduct(pId){ 
        if(await RemoveCartItem(pId)){ 
            $('.errMsg').fadeIn(1000,function(){ 
                setTimeout(() => {
                    $('.errMsg').fadeOut(1000);
                    $('#removeProductBtn').fadeOut(500);
                    $('#addProductBtn').fadeIn(1000);
                }, 1000);
            })
        }
    }


    useEffect(function(){ 
        getProductDetails();
    },[])

    return <> 
    {product? <div className="container p-4">
        <div className="row">
            <div className="col-12 col-md-3">
                <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={product.imageCover} className='w-100 d-block' alt={product.title}/>
                    </div>
                    {product.images.map(function(img,idx){ 
                        return <div className="carousel-item" key={idx}>
                                    <img src={img} className="d-block w-100" alt={idx}/>
                                </div>
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="text-primary carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
                {/* <img src={product.imageCover} className='w-100' alt={product.title} srcset="" /> */}
            </div> 
            <div className="col-12 col-md-9">
                <h3 className='text-center text-primary fw-bolder'>{product.title}</h3> 
                <p>{product.description}</p> 
                <h6><span className='text-primary'>Quantity: </span>{product.quantity}</h6>
                <h5><span className='text-primary'>Price: </span>{product.price}</h5>  
                <div className='w-100'>
                    <button id='addProductBtn' onClick={function(){AddProduct(product.id)}} className='btn btn-outline-primary w-100'>Add to cart</button>
                    <button style={{display:"none"}} onClick={()=>{removeProduct(product.id)}} id='removeProductBtn' className='btn btn-danger w-100'>Remove from cart</button>
                </div> 

                <div style={{display:"none"}} className="successMsg alert alert-success text-center mt-1 ">Product is added successfully to your cart..</div>
                <div style={{display:"none"}} className="errMsg alert alert-danger text-center mt-1 ">Product is removed successfully from your cart..</div>
            </div>
        </div>
    </div> : <LoadingScreen/>}
    </>
}

export default ProductDetails;