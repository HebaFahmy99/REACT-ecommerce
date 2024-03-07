import React from 'react';

function Profile({currUser}) {
    return <> 
    
    <div className='container p-5 d-flex justify-content-center align-items-center'> 
        <h2 className='p-3'>Welcome <span className='text-primary'>{currUser.name}!</span></h2>
    </div>
    </>
}
export default Profile;