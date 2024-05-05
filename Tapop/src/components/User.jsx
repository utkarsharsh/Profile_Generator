import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'


const User = () => {
    const navigate =useNavigate()
const {id }=useParams();
const [rotation, setRotation] = useState({ x: 0, y: 0 });
const [info,setinfo]=useState([])
console.log(id);
async function mycall(){
   let url=import.meta.env.VITE_URL
   console.log(url);
    const{data}=await axios.post(url+"/profile",{email:id})
    if(data =="First create your account"){
        alert("No user found create an user");
        navigate("/");
    }
    else setinfo(data);
}
const handleMouseMove = (e) => {
  const xOffset = (e.clientX / window.innerWidth - 0.5) * 150;
  const yOffset = (e.clientY / window.innerHeight - 0.5) * 150;

  setRotation({ x: -yOffset, y: xOffset });
};

useEffect(()=>{
mycall();
},[])


  return (
    <div>
     <div className="flex  justify-center w-screen items-center h-screen 
    bg-[url('https://d.furaffinity.net/art/murcielagomedula/1300569075/1300569075.murcielagomedula_apophysis-110319-5.jpg')] overflow-auto
    ">


        <div className='flex sm:w-5/6  mt-3  flex-wrap justify-center items-center gap-2 '>
             
        {info.map((e)=>{
          let date=(e.updatedAt).substring(0,10);
          return (
           <div className='  w-[500px] h-[655px] before:content-[""] before:w-[500px] before:h-[655px] before:opacity-40 before:bg-zinc-500 before:absolute before:z-0 relative transform transition-transform duration-200' 
           style={{
           
             transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
           }} onMouseEnter={handleMouseMove} onMouseLeave={()=>{
            setRotation({x:0,y:0})           }}>
           <div className='opacity-100  z-50 absolute w-[100%] top-0 left-0   '>
             <div className='relative flex justify-center items-center flex-col '>
             <div className=' border-x-2 w-[250px] h-[250px] border-y-2 mt-3 mb-2 rounded-full border-y-yellow-400 border-x-purple-400 relative' > 
<img src={e.image} alt="" className='absolute object-cover w-[100%] h-[100%] rounded-full'/>
     </div>
     <div className='w-[100%] flex flex-col justify-center items-center'>
       <div className=' w-5/6 '>
       <button className='text-white w-[100%] m-2 p-5 bg-amber-500 rounded-md '>{e.name}</button>
       </div >
       <div className=' w-5/6'>
       <button className='text-white w-[100%] m-2  p-5 bg-cyan-500 rounded-md '>{e.email}</button>
       </div>
       <div className=' w-5/6'>
       <button className='text-white w-[100%] m-2  p-5 bg-purple-600 rounded-md '>Created At:  {date} </button>
       </div>
       <div className=' w-5/6'>
       <button className='text-white w-[100%] m-2  p-5 bg-purple-600 rounded-md '>Phone:  {e.phone} </button>
       </div>
     </div>

     </div>
           </div>
          </div>

)})}
           
        </div>
    </div>

    </div>
  )
}

export default User