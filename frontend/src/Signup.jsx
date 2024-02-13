import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import { useState } from 'react';
import axios from 'axios';

function Signup(){
    const [values,setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const[errors,setErrors] = useState({})

    const handleInput= (event) => {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
    const handleSubmit =(event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup',values) 
            .then((res) => {
                navigate('/')
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }     
    }


    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-Up</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'>Name</label>
                    <input type="name" placeholder='Enter Name' name='name' onChange={handleInput} />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>            
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={handleInput}/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success'>Sign Up</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/signup" className='btn btn-default border'>Create Account</Link>
            </form>
          </div>
        </div>

    )
}

export default Signup;