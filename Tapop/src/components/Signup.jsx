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
import { auth } from '../auth/auth';
const Signup = () => {
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
    


   if(token=="") {
    alert("mark the reChapche");
    return;
   }
   if(imageurl==""){
    alert("wait for image to upload");
    return;
   }
      e={...e,image:imageurl};
      let x=e;
    Dispatch(increment(x));
    e={...e,image:imageurl,token};
  
    let url = import.meta.env.VITE_URL;
  let signup="/signup"
  url =url.concat(signup);
 
    

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const {data}= await axios.post(url,e,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      if(data.status=="Succesfull"){
      setSuccessMessage(data.status);
     localStorage.setItem("token",user.refreshToken);
        navigate("/post");
        console.log(user);
      }}
      )
      .catch((error) => {
       console.log(error);
      })
      
  };

  const refer=useRef();
  async function handleurlchange(e){
      let x=e.target.files[0];
    const blob = new Blob([x], { type: x.type });
    const objectURL = URL.createObjectURL(blob);
    setimage(objectURL);
    const dat=new FormData();
    dat.append("file",x);
    dat.append("upload_preset","Brainop");
    const {data} =await axios.post("https://api.cloudinary.com/v1_1/disggmk1g/image/upload",dat) ;
     setimageurl(data.url);
  }
  
  

  function setTokenFunc(getToken)  {
      setToken(getToken);
  };


  


  return (
   
 
    <div className="flex h-screen justify-center w-screen 
    bg-gradient-to-r from-purple-500 to-yellow-400
    ">
   
    <div className=" mt-8  sm:flex rounded shadow-lg  mb-5 overflow-hidden  w-5/6 transform transition-transform duration-200" onMouseMove={handleMouseMove} onMouseLeave={()=>{setRotation({x:0,y:0})}} style={{
         
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}>
     <Image/>

    <div className="h-[98%] p-6  rounded  bg-transparent  sm:bg-white sm:h-6/6 mb-5 overflow-auto w-[100%] md:w-[60%]">
      <h2 className="text-2xl mb-2 text-center text-white sm:text-blue-500 sm:font-bold">Sign Up</h2>
      {successMessage && (
        <div className="bg-green-200 text-green-700 p-3 rounded mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className=''> 
        <input type="file" ref={refer} className='hidden' onChange={handleurlchange}/>
        <div className='flex justify-center align-middle mb-2 mt-2 cursor-pointer' onClick={()=>{
            refer.current.click();
        }}>
             <div className='w-[100px] h-[100px] rounded-full border-r-yellow-300  border-l-yellow-300 border-b-violet-300 border-t-violet-300 border-4 bg-white flex justify-center items-center'>
            
         {image == '' ?  <img src={add} alt="" srcset="" className='w-[40px] h-[40px]' />:  <img src={image} alt="" srcset="" className='w-[100%] h-[100%] rounded-full ' />}   
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
        <div className="mb-4">
          <input type="password" placeholder="Confirm Password"  {...register("confirmPassword", { required: true, validate: value => value == password })} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.confirmPassword && errors.confirmPassword.type === "required" && <p className="text-red-500">Confirm Password is required</p>}
          {errors.confirmPassword && errors.confirmPassword.type === "validate" && <p className="text-red-500">Passwords must match</p>}
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Name" {...register("name",{required:true})} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>
        <div className="mb-4">
          <input type='number' placeholder="Phone number" {...register("phone", { required: true,minLength: 10})} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.phone && errors.phone.type === "required" && <p className="text-red-500">Phone number is required</p>}
          {errors.phone && errors.phone.type === "minLength" && <p className="text-red-500">Phone number is not valid.</p>}
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register("termsAndConditions", { required: true })} className="mr-2" />
            <span className=" text-rose-50 sm:text-black font-semibold" >I accept the Terms & Conditions</span>
          </label>
          {errors.termsAndConditions && <p className="text-red-500">Terms & Conditions must be accepted</p>}
        </div>
        <ReCAPTCHA
    sitekey={key}
    onChange={setTokenFunc}
  />
  <div >
            <h1 className=' text-slate-500'>Already have an account ? <a href='/sign' className=' text-sky-300'> SignIn</a></h1>
         </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3">Sign Up</button>       
      </form>
    </div></div></div>
    
  );
};

export default Signup;
