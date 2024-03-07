import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import SlickSlider from '../SlickSlider/SlickSlider';
import { CartStoreContext } from '../../Context/CartContextProvider';
import $ from "jquery";

function Home(props) {
    let [allProducts, setAllProducts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pages, setPages] = useState(0);
    const [nextLoading, setNextLoading]= useState(false);
    const [prevLoading, setPreviousLoading]= useState(false);
 
    const {AddProductToCart,RemoveCartItem} = useContext(CartStoreContext)

    async function GetAllProducts(pageIndex){ 
        try{ 
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,  
            { 
                params:{'page': `${pageIndex}`}
            })
            setAllProducts(response.data.data);  
            let total = response.data.results; 
            let pagesNumber = total/response.data.metadata.limit; 
            setPages(Math.ceil(pagesNumber));
        }
        catch(err){ 
            console.log(err);
        }
    } 

    async function AddMyProductToCart(pId){ 
        if(await AddProductToCart(pId)){ 
            $('.addedSucessFully').fadeIn(500, function(){ 
                setTimeout(() => { 
                    $(`.addBtn${pId}`).fadeOut(200)
                    $(`.removeBtn${pId}`).fadeIn(500)
                    $('.addedSucessFully').fadeOut(1000); 

                }, 1000);
            }); 
            
        }
    }

    async function removeMyProductFromCart(pId){ 
        if(await RemoveCartItem(pId)){ 
            $('.removedSucessFully').fadeIn(500, function(){ 
                setTimeout(() => { 
                    $(`.removeBtn${pId}`).hide(200)
                    $(`.addBtn${pId}`).fadeIn(200)
                    $('.removedSucessFully').fadeOut(1000); 

                }, 1000);
            }); 
            
        }
    }
 
    
    useEffect(function(){ 
        GetAllProducts(1);

    },[]) 

    async function GetNextPage(){  
        setPageIndex(pageIndex+1);  
        console.log(pageIndex,'nexxttt') 
        if(pageIndex <= pages){   
            setNextLoading(true);
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageIndex}`)
            setAllProducts(response.data.data); 
            setNextLoading(false);
        }  
        else{       
              setPageIndex(pages)
        } 
     
      } 
    
      async function GetPreviousPage(){ 
        console.log(pageIndex);
        // let temp = pageIndex--; 
        setPageIndex(pageIndex-1);
        if(pageIndex < pages && pageIndex > 0){  
          setPreviousLoading(true)
          const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageIndex}`)
          setAllProducts(response.data.data);
          setPreviousLoading(false);
        }  
        else{ 
            setPageIndex(1)
        }
      }


    return <>  

      {allProducts.length !==0 ?  

            <div className="container p-4"> 
            <div style={{'zIndex':'999', 'display':'none'}} className="ms-1 addedSucessFully alert bg-dark text-white w-25 position-fixed bottom-0 start-0">
                Product is added to your cart!
            </div>
            <div style={{'zIndex':'999', 'display':'none'}} className="ms-1 removedSucessFully alert bg-dark text-white w-25 position-fixed bottom-0 start-0">
                Product is removed from your cart!
            </div>
                <SlickSlider />
                <div className="row g-2">  
            {allProducts.map((product,idx)=> 
            <div  key={idx} className="col-6 col-xl-2 col-md-3" >
                <div className='bg-success rounded-4'> 
                    <div className="product position-relative "> 
                        <Link to={`/productdetails/${product.id}`} className='nav-link'> 
                            <img src={product.imageCover} className='w-100' alt={product.title} />
                            <div className="productData p-2">
                                <p className='text-center text-white' title={product.title} >{product.title.split(" ").slice(0,4).join(" ")}</p> 
                                <span className='text-warning bold'>{product.category.name}</span> 
                                <h6 className='text-white'>Price: {product.priceAfterDiscount? <><span className='text-decoration-line-through'>{product.price}</span> <span> {'==> ' + product.priceAfterDiscount}</span></> : <span>{product.price}</span> }</h6>
                                <div className=" position-absolute p-2 text-white bg-warning top-0 end-0">{product.ratingsAverage}</div> 
                            </div>
                        </Link>
                        <div className='bg-warning w-100 text-center text-white'>
                            <button onClick={()=>{AddMyProductToCart(product.id)}} className={`btn addBtn${product.id}`}>Add +</button>
                        </div>
                        <div  className='bg-danger w-100 text-center text-white'>
                            <button style={{'display':'none'}} onClick={()=>{removeMyProductFromCart(product.id)}} className={`btn removeBtn${product.id}`}>remove +</button>
                        </div>
                    </div>
                </div>
            </div>
           )}
        {allProducts? <div className="w-75  m-auto mt-3 d-flex justify-content-between align-items-center">
        <div>
          <button type="button" className="btn btn-outline-success"  onClick={GetPreviousPage}> 
              {prevLoading? <i className="fas fa-spinner fa-spin me-2"></i> : <span>Previous</span>} 
          </button>
        </div>  
        <div> 
          <span className='text-success'>Page {pageIndex} out of {pages}</span>
        </div>
        <div>
          <button type="button" className="btn btn-outline-success" onClick={GetNextPage}> 
              {nextLoading? <i className="fas fa-spinner fa-spin me-2"></i> : <span>Next</span>} 
          </button>
        </div> 
    
        </div> : '' }
        </div>
            </div> : <LoadingScreen/>      
    
    
    }  
    </>
}

export default Home;