import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";


function SlickSlider(props) { 
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1, 
      };

    return <> 
        <div className="row g-0 mb-5">
            <div className="col-12 col-md-9">
                <Slider {...settings}>
                    <div className='position-relative'>
                        <img src={require('../../Assets/slider-image-1.jpeg')} className='w-100' style={{'height':300 +'px'}} alt="" srcset="" />
                        <div className='position-absolute top-0 start-0 d-flex justify-content-center align-content-center'> 
                            <h3 className='bg-warning text-danger p-4'>Sale</h3>
                        </div>                  
                    </div>
                    <div className='position-relative'>
                    <img src={require('../../Assets/slider-image-2.jpeg')} className='w-100' style={{'height':300 +'px'}} alt="" srcset="" />
                        <div className='position-absolute top-0 start-0 d-flex justify-content-center align-content-center'> 
                            <h3 className='bg-warning text-danger p-4'>Sale</h3>
                        </div>                  
                    </div>
                    <div>
                        <img src={require('../../Assets/slider-image-3.jpeg')} className='w-100' style={{'height':300 +'px'}} alt="" srcset="" />
                    </div>
                </Slider>
            </div> 
            <div className='col-12 col-md-3'>
                <div className='d-flex flex-column'>
                    <img style={{'height':150 +'px'}} className='w-100' src={require('../../Assets/flat-lay-natural-self-care-products-composition.jpg')} alt="makeup img" srcset="" />
                    <img style={{'height':150 +'px'}} className="w-100" src={require('../../Assets/hands-using-vanity-case-side-view.jpg')} alt="vanity case" srcset="" />
                </div>
            </div>
        </div>
    
    
    </>
}

export default SlickSlider;