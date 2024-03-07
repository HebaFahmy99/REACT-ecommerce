import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom'; 

function Register(props) {  
    const router = useNavigate(); 
    const [isLoading, setIsLoading]= useState(false);  
    const [disable,setDisable]= useState(true);
    const [password,setPassword]= useState('password');

    // let [error, setError]= useState('');
    async function RegisterUser(userObj){  
        setIsLoading(true)
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userObj)

            if(data.message == 'success'){ 
                $('.sucessMsg').fadeIn(1000, function(){ 
                    router('/login');
                }); 
            }
        } catch (error) { 
            setIsLoading(false)
            // setError(error.response.data.errors.msg);
            $('.errorMsg').fadeIn(1000,function(){ 
                setTimeout(() => {
                    $('.errorMsg').fadeOut(500)
                }, 3000);
            })
        }
    }

    function togglePassword(){ 
        let field = document.getElementById('flexCheckDefault') 
        if(field.checked){ 
            setPassword('text')
        }else{ 
            setPassword('password')
        }
    }


    let userData={ name:'', phone:'', email:'', password:'', rePassword:''}
    let myFormik = useFormik({ 
        initialValues: userData,
        onSubmit:function(values){  
            RegisterUser(values);
        },
        validate:function(values){ 
            const errors = {}; 
            if(!values.name){ 
                errors.name = 'Name is Required'
            }else{ 
                if(values.name.length < 3 || values.name.length > 15){ 
                    errors.name = 'Name can not be less than 3 characters or exceeding 15 characters'
                }
            }

            if(!values.phone){ 
                errors.phone = 'Phone number is required';
            }  

            if(!values.email){ 
                errors.email = 'Email Address is required' 
            }else{ 
                if(!values.email.match(/^\S+@\S+\.\S+$/)){ 
                    errors.email ='Email Address is not valid'
                }
            } 

            if(!values.password){ 
                errors.password = 'Password is required';
            }else{ 
                if(!values.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/)){ 
                    errors.password = 'Password must contain at least one uppercase letter, one digit, and one special character (!@#$%^&*).';
                }
            } 

            if(values.password !== values.rePassword){ 
                errors.rePassword = 'Passwords are not matched'
            }  


            if(Object.keys(errors).length == 0){ 
                setDisable(false)
            }else{ 
                setDisable(true)
            }
            return errors;
        }

    })


    return <>  
    <div className="container p-4">
        
    <h2>Registeration Form</h2> 
    <div style={{'display': 'none', 'textAlign': 'center'}} className='alert alert-success sucessMsg'>Success</div>
    {/* <div style={{'display': 'none', 'textAlign': 'center'}} className='alert alert-danger errorMsg'>{error}</div> */}
    <div style={{'display': 'none', 'textAlign': 'center'}} className='alert alert-danger errorMsg'>Error</div>
    <form onSubmit={myFormik.handleSubmit}> 
        <div className='mb-2'>
            <label htmlFor="name">Name</label> 
            <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.name} type="text" className='form-control' id='name' />
        </div> 
        {myFormik.errors.name && myFormik.touched.name? <div className='alert alert-danger p-2'>{myFormik.errors.name}</div> : ''}
        <div className='mb-2'>
            <label htmlFor="phone">Phone</label> 
            <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.phone} type="text" className='form-control' id='phone'/>
        </div> 
        {myFormik.errors.phone && myFormik.touched.phone? <div className='alert alert-danger p-2'>{myFormik.errors.phone}</div> : ''}

        <div className='mb-2'>
            <label htmlFor="email">Email Address</label> 
            <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.email} type="email" className='form-control' id='email' />
        </div> 
        {myFormik.errors.email && myFormik.touched.email? <div className='alert alert-danger p-2'>{myFormik.errors.email}</div> : ''}

        <div className='mb-2'>
            <label htmlFor="password">Password</label> 
            <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.password} type={password} className='form-control' id='password' />
        </div> 
        {myFormik.errors.password && myFormik.touched.password? <div className='alert alert-danger p-2'>{myFormik.errors.password}</div> : ''}

        <div className='mb-2'>
            <label htmlFor="rePassword">Re-password</label> 
            <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.rePassword} type={password} className='form-control' id='rePassword' />
        </div>  

        {myFormik.errors.rePassword && myFormik.touched.rePassword? <div className='alert alert-danger p-2'>{myFormik.errors.rePassword}</div> : ''}
        {/* {console.log(isLoading)} */}
        
        <div className="form-check float-end mb-2">
            <input className="form-check-input" onChange={togglePassword}  type="checkbox" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Show passwords
            </label>
        </div>  
        <div className='clearfix'></div>
        <div className='mb-2'> 
            <button disabled={disable} className='btn btn-outline-success btn-group-lg'  type='submit'>  
                {isLoading? <i className="fas fa-spinner fa-spin me-2"></i> : <span>Register</span> } 
            </button>
        </div>  
    </form>
    
    
    </div>
    </>
}

export default Register;