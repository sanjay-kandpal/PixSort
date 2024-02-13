import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation'; 
import axios from 'axios';
function Login(){
    const [values,setValues] = useState({
        email: '',
        password: ''
    })
    const[errors,setErrors] = useState({})
    const navigate = useNavigate();
    const handleInput= (event) => {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then((res) => {
            console.log(res);
            if(res.data.valid){
               navigate('/');
            }else{
                navigate('/Login');
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleSubmit =(event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(
            errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login',values) 
            .then((res) => {
                console.log(res.data);
                if(res.data.message === true){
                    navigate('/')
                }else{
                  alert('Invalid Credentials');  
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }     
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-In</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                     onChange={handleInput} className='form-control rounded-0' />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                     onChange={handleInput} className='form-control rounded-0'/>
                     {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success  w-100'>Log In</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/signup" className='btn btn-default border w-100'>Create Account</Link>
            </form>
          </div>
        </div>
    )
}
export default Login;