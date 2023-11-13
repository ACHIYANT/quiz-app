import React from 'react'

export default function BackButton({dispatch,isFirstQuestion}) {
if(isFirstQuestion) return null;
  return (!isFirstQuestion && <button className='btn btn-ui' style={{marginRight:'10px'}} onClick={()=>{dispatch({type:'back'})}}>Back</button>);
}
