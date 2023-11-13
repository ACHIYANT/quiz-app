import React from "react";
import useKey from "./useKey";
export default function NextButton({ dispatch, isAnswered, isLastQuestion }) {
  useKey("enter", () => {
    if (isAnswered && isLastQuestion) dispatch({ type: "finish" });
    if (isAnswered) dispatch({ type: "next" });
  });
  if (!isAnswered) return;
  if (isLastQuestion)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: "next" });
      }}
    >
      Next
    </button>
  );
}
