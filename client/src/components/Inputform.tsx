import React from 'react'
import { useState } from 'react';
type formprops=
{
  title:string
  text:string
}
const Inputform = (props:formprops) => {
  const[input,setinput] = useState("");
  return (
    <form> 
        <header>
            {props.title}
          </header>
        <input type = "text" 
        className="container" 
        ></input>
    </form>
  )
}

export default Inputform
