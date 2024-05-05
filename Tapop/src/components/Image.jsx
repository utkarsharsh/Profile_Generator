import React, { useState } from 'react';
import pic1 from '../assets/Pic1.png'

const Image = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 100;
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 100;

    setRotation({ x: -yOffset, y: xOffset });
  };

  return (
    <div className="  hidden justify-center md:flex  items-center  md:w-[40%] m-0 p-0 h-[100%] ">
      <div
        className="w-[90%] h-[95%]  bg-cover    transform transition-transform duration-200"
        style={{
         backgroundImage:`url(${pic1})`,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={()=>{setRotation({x:0,y:0})}}
      ></div>
    </div>
  );
};

export default Image;