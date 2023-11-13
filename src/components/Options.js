import React from "react";


export default function Options({ index,question, dispatch, answer }) {
  // const hasAnswered = answer !== null;
  const hasAnswered = answer.length > index; 
  // console.log(hasAnswered);
  
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer[index] ? "answer" : ""} ${
            hasAnswered &&
            (idx === question.correctOption ? "correct" : "wrong")
          }`}
          key={idx}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
