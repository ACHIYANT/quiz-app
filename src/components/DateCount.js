import React from "react";
import { useState } from "react";

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [counter,setCounter] = useState(0);
  function handleStep(e)
  {
    setStep(Number(e.target.value));
  }
  function handleCounterIncerement(){
    // console.log(typeof(step),typeof(counter));
    // if(step === 0)
    //     setCounter((counter)=>(counter+1)); 
    // else
    setCounter((counter)=>(counter+step));
  }
  function handleCounterDecrement(){
    // if(step === 0)
    //     setCounter((counter)=>(counter-1)); 
    // else
    setCounter((counter)=>(counter-step));
  }
  function handleCounter(e){
    const value = Number(e.target.value);
    if(isNaN(value))
    {
        setCounter(0);
    }
    else{
        setCounter(value);
    }
  }
  function handleReset(){
    setCounter(0);
  }
  const date = new Date('10 January 2001');
  date.setDate(date.getDate()+counter);
  return (
    <div>
    <div>
      <input type="range" value={step} min={0} max={10} onChange={handleStep} />
      <p>{step}</p>
    </div>
    <div>
        <button onClick={handleCounterDecrement}>-</button>
        <input type="text" value={counter} onChange={handleCounter} />
        <button onClick={handleCounterIncerement}>+</button>
    </div>
    <p>{date.toDateString()}</p>
    <button onClick={handleReset}>Reset</button>
    </div>
  );
}
