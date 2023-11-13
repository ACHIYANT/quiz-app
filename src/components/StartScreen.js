import React from 'react'
import useKey from './useKey';
export default function StartScreen({numQuestions,dispatch,children}){

  // console.log(numQuestions);
  // console.log(children.props.value)
  // useEffect(function(){
  //   function callback(e){
  //     if(e.code === 'Enter')
  //     dispatch({type:'start'});
  //   }
  //   document.addEventListener('keydown',callback);
  //   return function(){
  //     document.removeEventListener('keydown',callback);
  //   }
  // },[dispatch])
  useKey('enter',()=>dispatch({type:'start'}))
  return (
    <div className='start'>
        <h2>Welcome to The React Quiz !</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        {children}
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's Start</button>
    </div>
  )
}
