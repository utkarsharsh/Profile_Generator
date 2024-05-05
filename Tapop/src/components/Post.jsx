import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
const Post = () => {
  const [info,setinfo]=useState([]);
  const [info2,setinfo2]=useState([])
  const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [sizes, setSizes] = useState(256);
    const [show,setshow]=useState("none");
    const [myurl,setmyurl]=useState("")
  const [m,setm]=useState(0);
  const u=import.meta.env.VITE_USER;
  
  let size=0;
  const [options,setoptions]=useState("0");
  const information=useSelector((state) => state.profile);

  localStorage.setItem("email",information[information.length-1].email)
  const [value,setvalue]=useState("");
   const navigate =useNavigate();
  async function firstcall(){
    let url=import.meta.env.VITE_URL;
    let localtoken=localStorage.getItem("token");
    
   if(localtoken==null){
    navigate('/');
    return
   }
    const {data}= await axios.post(url+`/post/${options}`,{},{
      headers: {
        'authorization':`Bearer ${localtoken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  });
 
  
  setinfo(data);

  }
  
  
  useEffect(()=>{
    setmyurl(u);
 firstcall();
  },[]);





    






















  return (
    <div className="flex  justify-center w-screen items-center h-screen 
    bg-[url('https://d.furaffinity.net/art/murcielagomedula/1300569075/1300569075.murcielagomedula_apophysis-110319-5.jpg')] overflow-auto
    ">
        
      <div className='bg-black mt-3 h-11 rounded-sm w-[100px] absolute flex justify-center text-white border-2 border-cyan-400 left-8 top-4 z-[1000] '>
       
        <button onClick={()=>{
           
          console.log(information[information.length-1].email)
          if(information[information.length-1].email){
           
            
          //  u=u+information[information.length-1].email;
           
          setvalue(myurl+`${information[information.length-1].email}`);
        }
        console.log(myurl+`${information[information.length-1].email}`);
        setshow("flex")
          
          console.log(value)
        }}>
          Show my Qr
        </button>
      </div>
      <div className='absolute z-[1000] w-5/6 sm:w-4/6 md:3/6 h-[500px] shadow-lg  p-4 rounded-md bg-white justify-center items-center' style={{
        display:show
      }}>
      <h1 className=' text-4xl text-slate-900 absolute top-2 right-5 shadow-lg cursor-pointer' onClick={()=>{setshow("none")}}>X</h1>
      {value && (
                    <QRCode
                        title="Profile"
                        value={value}
                        bgColor={back}
                        fgColor={fore}
                        size={sizes === '' ? 100 : sizes}
                    />
                )}
                <button className='absolute bottom-5 rounded-md bg-green-600 p-2 text-white hover:shadow-xl hover:shadow-lime-200 ' onClick={()=>{
               navigate( "/profile"+`/${information[information.length-1].email}`)
                }}>
                  SCAN or Click me
                </button>
</div>


        <div className='flex sm:w-5/6  mt-3  flex-wrap justify-center items-center gap-2 '>
             
        {info.map((e)=>{
          let date=(e.updatedAt).substring(0,10);
          return (
           <div className='  w-[300px] h-[355px] before:content-[""] before:w-[300px] before:h-[350px] before:opacity-40 before:bg-zinc-500 before:absolute before:z-0 relative' >
           <div className='opacity-100  z-50 absolute w-[100%] top-0 left-0   '>
             <div className='relative flex justify-center items-center flex-col '>
             <div className=' border-x-2 w-[150px] h-[150px] border-y-2 mt-3 mb-2 rounded-full border-y-yellow-400 border-x-purple-400 relative' > 
<img src={e.image} alt="" className='absolute object-cover w-[100%] h-[100%] rounded-full'/>
     </div>
     <div className='w-[100%]'>
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-amber-500 rounded-md '>{e.name}</button>
       </div >
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-cyan-500 rounded-md '>{e.email}</button>
       </div>
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-purple-600 rounded-md '>Created At:  {date} </button>
       </div>

     </div>

     </div>
           </div>
          </div>

)})}
           
        </div>
    </div>
  )
}

export default Post