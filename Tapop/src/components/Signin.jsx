
import React, { useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import add from '../assets/add.svg'
import { useDispatch } from 'react-redux';
import { increment } from '../store/createslice';
import ReCAPTCHA from "react-google-recaptcha";
import Image from './Image';
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../auth/auth';

const Signin = () => {
    const navigate=useNavigate()
    const [password,setpassword]=useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [token, setToken] = useState("");
    const [image,setimage]=useState('');
    const [imageurl,setimageurl]=useState("");
    const Dispatch =useDispatch();
    const key=import.meta.env.VITE_KEY;
     
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 10;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 10;
  
      setRotation({ x: -yOffset, y: xOffset });
    };
    
   
    
  
  
  
    const onSubmit = async (e) => {
  
     const {email,password}=e;
     Dispatch(increment({email:e.email}));
      
     const auth = getAuth();
     signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        navigate('/post')
         const user = userCredential.user;
         setSuccessMessage("Success");
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         setSuccessMessage(errorMessage);
       });
    
  
    };
    return (
     
   
      <div className="flex h-screen justify-center w-screen 
      bg-gradient-to-r from-purple-500 to-yellow-400
      ">
     
      <div className=" mt-8  sm:flex rounded shadow-lg  mb-5 overflow-hidden  w-4/6 transform transition-transform duration-200" onMouseMove={handleMouseMove} onMouseLeave={()=>{setRotation({x:0,y:0})}} style={{
           
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}>
       <Image/>
  
      <div className="h-[98%]  p-6  rounded  bg-transparent  bg-white sm:h-6/6 mb-5 overflow-auto   md:w-[60%] w-[100%] ">
        <h2 className="text-2xl mb-4 text-center  text-blue-500 font-bold">Sign In</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-3 rounded mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} >
         
          <div className='flex justify-center items-center mb-4 mt-4 cursor-pointer' onClick={()=>{
              refer.current.click();
          }}>
               <div className='w-[100px] h-[100px] rounded-full border-r-yellow-300  border-l-yellow-300 border-b-violet-300 border-t-violet-300 border-4 bg-white flex justify-center items-center'>
              
           {  <img src="https://imgupscaler.com/images/samples/Imgupscaler_2_2x.webp" alt="" srcset="" className='w-[100%] h-[100%] rounded-full ' />}   
               </div>
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 border-2 border-cyan-500 rounded" />
            {errors.email && errors.email.type === "required" && <p className="text-red-500">Email is required</p>}
            {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Invalid email format</p>}
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} className="w-full p-2 border-2 border-cyan-500 rounded" onChange={(e)=>{setpassword(e.target.value)}}/>
            {errors.password && errors.password.type === "required" && <p className="text-red-500">Password is required</p>}
            {errors.password && errors.password.type === "minLength" && <p className="text-red-500">Password must be at least 6 characters</p>}
          </div>
          <div >
            <h1 className=' text-slate-500'>Create a accont ? <a href='/' className=' text-sky-300'> SignUp</a></h1>
         </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600  ml-[40%] mt-4">Sign In</button>       
        </form>
      </div></div></div>
      
    );
}

export default Signin