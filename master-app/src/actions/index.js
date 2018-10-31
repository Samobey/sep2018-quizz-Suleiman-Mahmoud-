import { loadCatagories,loadQuistions } from "../data/asyncData";
import Quistions from "../components/Quistions";

export const chooseComponent = component => {
  return {
    type: "choose-component",
    component
  };
};

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
  

