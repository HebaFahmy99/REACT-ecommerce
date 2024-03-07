import React, { useContext } from 'react';
import { CartStoreContext } from '../../Context/CartContextProvider';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function Cart(props) { 

    const {cartProducts,totalCartPrice, RemoveCartItem, updateItemCount} = useContext(CartStoreContext);
    return <>  
        {cartProducts? <> 
        <div  className="text-center my-3 p-3 bg-warning w-25">
            <h3 className='text-white'>Total Price : {totalCartPrice} $</h3>
        </div> 
            <div className="container p-4"> 
            <div className="row">
                {cartProducts.map((pro,idx)=> <div className="col-md-3" key={idx}>
                    <div className="cartProduct" >
                        <img src={pro.product.imageCover} className='w-100' alt={pro.product.title} srcset="" /> 
                        <div className="bg-success p-2 text-white">
                            <p title={pro.product.title}>{pro.product.title.split(' ').slice(0,4).join(" ")}</p>  
                            <h6>{pro.price} EGY</h6> 
                            <div className="row"> 
                                <div className="col-6"> 
                                    <h5>Count: x{pro.count}</h5>
                                </div>  
                                <div className="col-6">
                                    <input type="number" min={1} onChange={(e)=>{updateItemCount(pro.product.id, e.target.value)}}  value={pro.count} className='w-100 form-control'/>
                                </div>
                            </div>
                            <span className='text-warning float-end'>{pro.product.brand.name}</span> 
                            <div className='clearfix'></div>  
                            <div className="w-100">
                                <button onClick={()=>{RemoveCartItem(pro.product.id)}} className='btn btn-danger w-100'>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div> 
        
        
        
        </>: <LoadingScreen/>}
    
    
    </>
}

export default Cart;