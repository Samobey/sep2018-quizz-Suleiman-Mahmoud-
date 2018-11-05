const initialState = {
  component: "join",
  question: { question: "Waiting for the question", category: "" },
  answers: [],
  quizzerId: 0,
  results:[]
};
let newState;
export default function(state = initialState, action) {
  switch (action.type) {
    case "add-answer":
      newState = { ...state };
      let answers = [...newState.answers];
      let CheckingAnswer = answers.findIndex(
        answer => answer.teamId === action.teamId
      );
      console.log(CheckingAnswer);
      if (CheckingAnswer === -1) {
        answers.push({ teamId: action.teamId, answer: action.answer,name:action.name });
      } else {
        answers[CheckingAnswer].answer = action.answer;
      }
      newState.answers = answers;
      return newState;
    case "set-quizzer-id":
      newState = { ...state };
      newState.quizzerId = action.quizzerId;
      return newState;
    case "choose-component":
      newState = { ...state };
      newState.component = action.component;
      return newState;
    case "load_question":
      newState = { ...state };
      let question = { question: action.question, category: action.category };
      newState.question = question;
      newState.answers = [];
      return newState;
    case "load-results":
      newState = { ...state };
      newState.component = "tableList";
      newState.results = [...action.results];
      return newState;
    break;
  }
  return state;
}
