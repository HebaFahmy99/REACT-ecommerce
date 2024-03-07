import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CartStoreContext = createContext();

function CartContextProvider({children}) { 
    const [ totalCartPrice, setTotalCartPrice] =useState(0);
    const [ numOfCartItems, setNumOfCartItems] =useState(0);
    const [cartProducts, setCartProducts] = useState(null); 

    async function AddProductToCart(pId){ 
        try{ 
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', 
            { 
                'productId': pId
            }, 
            { 
                headers:{'token':localStorage.getItem('tkn')}
            }) 
            if(data.status === 'success'){ 
                return true;
            }else{ 
                return false;
            }
        }catch(err){ 
            console.log(err);
        }
    }

    async function GetCartProducts(){
       try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',  
        { 
            headers:{'token':localStorage.getItem('tkn')}
        })  
        setTotalCartPrice(data.data.totalCartPrice); 
        setNumOfCartItems(data.numOfCartItems)  
        setCartProducts(data.data.products)
       } catch (error) {
        console.log('Error', error);
       }
    }  

    async function RemoveCartItem(productId){ 
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            { 
                headers:{'token':localStorage.getItem('tkn')}
            }) 

             setTotalCartPrice(data.data.totalCartPrice); 
            setNumOfCartItems(data.numOfCartItems)  
            setCartProducts(data.data.products) 
            if(data.status === 'success'){ 
                return true;
            }else{ 
                return false;
            }
        } catch (error) { 
            console.log(error);
            
        }
    }
 
    async function updateItemCount(pId,pCount){ 
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
            { 
               "count": pCount
            }, 
            { 
               headers:{'token':localStorage.getItem('tkn')}
            })  
            setTotalCartPrice(data.data.totalCartPrice); 
            setNumOfCartItems(data.numOfCartItems)  
            setCartProducts(data.data.products)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function(){ 
        GetCartProducts()
    },[])

    return <CartStoreContext.Provider value={{AddProductToCart, RemoveCartItem, updateItemCount, cartProducts, numOfCartItems, totalCartPrice }}> 
        {children}
    </CartStoreContext.Provider>
}

export default CartContextProvider;