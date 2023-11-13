import React, { useEffect, useReducer } from "react";
// import DateCounter from './DateCounter';
// import DateCount from './DateCount';
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import BackButton from "./BackButton";

const SECS_PER_QUES = 30;
const initialState = {
  questions: [],
  // loading,ready,active,error,finished
  status: "loading",
  index: 0,
  answer: [],
  points: 0,
  highScore: 0,
  remainingSeconds: null,
  userChoosedQues: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        userChoosedQues: state.questions.length,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.userChoosedQues * SECS_PER_QUES,
      };
    case "numberChanged":
      return {
        ...state,
        userChoosedQues:
          action.payload > state.questions.length
            ? state.questions.length
            : action.payload,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: [...state.answer, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "back":
      return { ...state, index: state.index - 1 };
    case "next":
      return { ...state, index: state.index + 1, answer: state.answer };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        userChoosedQues: state.userChoosedQues,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    remainingSeconds,
    userChoosedQues,
  } = state;


  // console.log('state',state);
  const numQuestions = questions.length;
  // console.log(typeof(questions));
  const maxPoints = questions?.slice(0, userChoosedQues)?.reduce((prev, curr) => prev + curr.points, 0);
  // console.log('numques',numQuestions);
  

  // const maxPoints=200;

  useEffect(function () {
    // fetch("http://localhost:8000/questions")
    // fetch('https://dev-1l7udhqjbzmshcf.api.raw-labs.com/react-questions')
    fetch("./data/questions.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }})
    
      .then((res) => res.json())
      .then((data) => {
      dispatch({ type: "dataRecieved", payload: data.questions })})
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      {/* <DateCount /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={userChoosedQues} dispatch={dispatch}>
            <input
              className="ques-input"
              type="number"
              value={userChoosedQues}
              min={1}
              max={numQuestions}
              onChange={(e) => {
                if (e.target.value <= 0)
                  dispatch({ type: "numberChanged", payload: 1 });
                else
                  dispatch({ type: "numberChanged", payload: e.target.value });
              }}
            />
          </StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={userChoosedQues}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              isLastQuestion={numQuestions === index + 1}
              index={index}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />

              <NextButton
                dispatch={dispatch}
                isAnswered={answer.length > index}
                isLastQuestion={Number(userChoosedQues) === index + 1}
              />
              <BackButton dispatch={dispatch} isFirstQuestion={index === 0} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
