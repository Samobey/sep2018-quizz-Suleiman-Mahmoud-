import { loadCatagories,loadQuistions } from "../data/asyncData";
import Quistions from "../components/Quistions";

export const increesQuistionsNumber = ()=>{
  return {
    type:'increes-quistion-number',
  }
}
export const addAnswer = (teamId,answer)=>{
  return {
    type:'add-answer',
    teamId,
    answer,
  }
}
export const deleteAnswer = (teamId)=>{
  return {
    type:"delete-answer",
    teamId
  }
}
export const changeQuistionclosedState = (questionClosed)=>{
  return {
    type:"question-closed-state",
    questionClosed
  }
}
export const setQuizzeCode = (quizzerCode)=>{
  return {
    type:'set-code',
    quizzerCode
  }
}
export const chooseComponent = component => {
  return {
    type: "choose-component",
    component
  };
};
 
export const newRound = ()=>{
  return{
    type:"new-round"
  }
}
export const acceptOrReject = (id, status) => {
  return {
    type: status,
    id
  };
};

export const addPlayer = player => {
  return {
    type: "add-player",
    player
  };
};
export const addQuistion = id =>{
  return {
    type: "add-quistion",
    id
  }
}
export const loadCatagoriesAction = () => {
  return dispatch => {
    loadCatagories()
      .then(catagories => {
        return dispatch({ type: "load-catagories", payload: catagories });
      })
      .catch(err => {
        dispatch({ type: "err", payload: err });
      });
  };
};

export const loadQuistionsAction = (catId) => {
    return dispatch => {
      loadQuistions(catId)
        .then(quistions => {
          return dispatch({ type: "load-quistions", payload: quistions,id:catId });
        })
        .catch(err => {
          dispatch({ type: "err", payload: err });
        });
    };
  };
  export const deleteTheLastCatagory = ()=>{
    return {
      type: "delete-the-last-catagory",
    };
  }
  

