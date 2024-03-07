import React from 'react';
import errImg from '../../Assets/error.svg';
function NotFound(props) {
    return <>  
        <div className="container p-4">
            <section className='p-5 mb-4 d-flex justify-content-center align-items-center'> 
                <img src={errImg} alt="errImage" srcset="" />
            </section>
        </div>

    
    
    </>
}

export default NotFound;