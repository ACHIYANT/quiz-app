import React from 'react';
import useKey from './useKey';

export default function FinishScreen({points,maxPoints,highScore,dispatch}) {
    const percentage = (points/maxPoints)*100;
    let emoji ;
     if(percentage === 100) emoji= '🥇';
     if(percentage >= 80 && percentage < 100) emoji='🥈';
     if(percentage >= 50 && percentage < 80) emoji='🥉';
     if(percentage >= 0 && percentage < 50) emoji='🪪';
     if(percentage === 0) emoji='🤦🏻';

     useKey('Enter',()=>{dispatch({type:'restart'})})
  return (
    <>

    <p className='result'>
    <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
    </p>
    <p className='highscore'>(HighScore: {highScore} points)</p>
    <button className='btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
    </>
  )
}
