import React from "react";
import Options from "./Options";

export default function Question({ question,dispatch,answer,index  }) {
  // const hasAnswered = answer !== null;
  return (
    <div>
      {/* <input type="progress" className="progress"></input> */}
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} index={index}/>
      {/* <div className="options">
        {question.options.map((option) => (
          <button className="btn btn-option" key={option}>
            {option}
          </button>
        ))}
      </div> */}
      {/* <div>
        <p>timer</p>
        {hasAnswered && (isLastQuestion ? <button className="btn btn-ui">Submit</button>:<button className="btn btn-ui" onClick={()=>dispatch({type:'next'})} >Next</button>)}

      </div> */}
    </div>
  );
}
