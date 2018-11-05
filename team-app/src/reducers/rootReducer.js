const initState = {
  component: "entry",
  question: "See the question in the score board",
  teams: ["team 1"],
  showActionForm: false,
  quizzerId: 0
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "change-the-text":
      let newState = { ...state};
      newState.text = action.text;
      return newState;
    case "set-quizzer-id":
      newState = { ...state};
      newState.quizzerId = action.quizzerId;
      return newState;
    case "next-component":
      newState = { ...state };
      newState.component = action.component;
      return newState;
    case "load_question":
      newState = { ...state };
      newState.showActionForm = true;
      console.log(newState.question);
      return newState;
    case "load_teams":
      newState = { ...state };
      let teams = [...state.quistions, action.payload];
      newState.teams = teams;
      return newState;
    default:
      break;
  }
  return state;
};

export default rootReducer;
