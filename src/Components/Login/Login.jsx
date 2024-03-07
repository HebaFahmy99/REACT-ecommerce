import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import $, { event } from 'jquery';
import { useNavigate } from 'react-router-dom'; 

function Login({getUserData}) {  
    const router = useNavigate(); 
    let [isLoading, setIsLoading]= useState(false); 
    let [disable,setDisable]= useState(true);
    let [password,setPassword]= useState('password');

    async function userLogin(userObj){  
        setIsLoading(true)
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userObj)
            isLoading = true;

            if(data.message == 'success'){  
                localStorage.setItem('tkn', data.token); 
                $('.sucessMsg').fadeIn(1000, function(){ 
                    router('/home');
                    getUserData(); 
                })                
            }
        } catch (error) { 
            setIsLoading(false);
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


    let userData={ email:'', password:''}
    let myFormik = useFormik({ 
        initialValues: userData,
        onSubmit:function(values){  
            userLogin(values);
        },
        validate:function(values){ 
            const errors = {}; 
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
    <h2>Login Form</h2> 

<div style={{'display': 'none', 'textAlign': 'center'}} className='alert alert-success sucessMsg'>Success</div>
<div style={{'display': 'none', 'textAlign': 'center'}} className='alert alert-danger errorMsg'>Incorrect email or  password</div>
<form onSubmit={myFormik.handleSubmit}> 

    <div className='mb-2'>
        <label htmlFor="email">Email Address</label> 
        <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.email} type="email" className='form-control' id='email' />
    </div> 
    {myFormik.errors.email && myFormik.touched.email? <div className='alert alert-danger p-2'>{myFormik.errors.email}</div> : ''}

    <div className='mb-2'>
        <label htmlFor="password">Password</label> 
        <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.password} type={password} className='form-control' id='password' />
    </div> 
    <div className="form-check float-end mb-3">
        <input className="form-check-input" onChange={togglePassword}  type="checkbox" id="flexCheckDefault"/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
            Show password
        </label>
    </div> 
    <br/>
    {myFormik.errors.password && myFormik.touched.password? <div className='alert alert-danger p-2'>{myFormik.errors.password}</div> : ''}

    <div className='mb-2'>

        <button disabled={disable} className='btn btn-outline-success btn-group-lg'  type='submit'>  
                {isLoading? <i className="fas fa-spinner fa-spin me-2"></i> : <span>Login</span> } 
        </button>
    </div>  
</form>

    </div>
    
    </>
}

export default Login;