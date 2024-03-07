import React from 'react';

function Footer(props) {
    return <> 
    <footer> 
        <div className="container p-3">
        <h3 className='fw-bold'>Get the FreshCart App</h3>
        <p className='text-muted'>We will send you a link, open it on your phone to download the app</p>
         <div className="row">
            <div className="col-10">
                <input type="text" placeholder='Email' className= 'w-100 form-control' />
            </div> 
            <div className="col-2 m-auto">
                <button className='btn btn-success'>Share App Link</button>
            </div>
         </div>
        </div>
    </footer>
    </>
}

export default Footer;