import { loadResults, loadquestion } from "../data/asyncData";

export const chooseComponent = component => {
  return {
    type: "choose-component",
    component
  };
};
export const setQuizzerId = quizzerId=>{
  return{
    type:"set-quizzer-id",
    quizzerId
  }
}

export const loadQuestionAction = (quistionsnumber,quizzerId) => {
  return dispatch => {
    loadquestion(quistionsnumber,quizzerId)
      .then(question => {
        return dispatch({ type: "load_question", question: question.question,category:question.category });
      })
      .catch(err => {
        dispatch({ type: "err", payload: err });
      });
  };
};
export const loadResultsAction = (quizzerId) => {
  return dispatch => {
    loadResults(quizzerId)
      .then(results => {
        console.log(results);
        return dispatch({ type: "load-results", results });
      })
      .catch(err => {
        dispatch({ type: "err", payload: err });
      });
  };
};
export const addAnswer = (teamId,answer,name)=>{
  return {
    type:'add-answer',
    teamId,
    answer,
    name,
  }
}
