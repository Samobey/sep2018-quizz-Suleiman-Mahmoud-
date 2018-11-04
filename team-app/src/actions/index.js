import { loadquestion, loadteams } from "../data/asyncData";

export const displayText = text => {
  return {
    type: "change-the-text",
    text
  };
};

export const changeComponent = component => {
  return {
    type: "next-component",
    component
  };
};

export const setQuizzerId = quizzerId=>{
  return{
    type:"set-quizzer-id",
    quizzerId
  }
}

export const loadTeamsAction = () => {
  return dispatch => {
    loadteams()
      .then(team => {
        return dispatch({ type: "load-team", payload: team });
      })
      .catch(err => {
        dispatch({ type: "err", payload: err });
      });
  };
};
export const loadQuestionAction = (quistionsnumber,quizzerId) => {
  return dispatch => {
    loadquestion(quistionsnumber,quizzerId)
      .then(question => {
        return dispatch({ type: "load_question", payload: question });
      })
      .catch(err => {
        dispatch({ type: "err", payload: err });
      });
  };
};
