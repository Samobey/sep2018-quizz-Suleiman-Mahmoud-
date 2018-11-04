const initialState = {
  component: "create",
  players: [],
  acceptedPlayers: [],
  allAccepted: false,
  catagories: [],
  quistions: [],
  addCatagories: [],
  selectedQuistions: [],
  quistionNumber: 0,
  quizzerCode: 0,
  roundNumber: 1,
  answers: [],
  // showQuestionsOption: false,
  questionClosed: false
};
let newState, players, quistions;
export default function(state = initialState, action) {
  switch (action.type) {
    case "delete-answer":
      newState = { ...state };
      answers = [...newState.answers];
      let indexOfAnswer = answers.findIndex(
        answer => answer.teamId == action.teamId
      );
      answers.splice(indexOfAnswer, 1);
      newState.answers = answers;
      return newState;
    case "set-code":
      newState = { ...state };
      newState.quizzerCode = action.quizzerCode;
      return newState;
    case "question-closed-state":
      newState = { ...state };
      newState.questionClosed = action.questionClosed;
      return newState;
    case "choose-component":
      newState = { ...state };
      newState.component = action.component;
      return newState;
    case "increes-quistion-number":
      newState = { ...state };
      newState.quistionNumber += 1;
      return newState;
    case "load-catagories":
      newState = { ...state };
      newState.catagories = [...action.payload];
      return newState;
    case "add-quistion":
      newState = { ...state };
      if (newState.selectedQuistions.includes(action.id)) {
        newState.selectedQuistions = [
          ...state.selectedQuistions.filter(element => element !== action.id)
        ];
      } else {
        newState.selectedQuistions = [...state.selectedQuistions, action.id];
      }
      return newState;
    case "new-round":
      newState = { ...state };
      newState.roundNumber++;
      newState.quistionNumber = 0;
      newState.questionClosed = false;
      newState.selectedQuistions = [];
      newState.addCatagories = [];
      newState.component = "setQuistions";
      return newState;
    case "accepted":
      newState = { ...state };
      let acceptedPlayer = [
        ...newState.players.filter(element => element.id === action.id)
      ];
      players = [
        ...newState.players.filter(element => element.id !== action.id)
      ];
      newState.players = players;
      newState.allAccepted = newState.players.length === 0 ? true : false;
      newState.acceptedPlayers = [...state.acceptedPlayers, ...acceptedPlayer];
      return newState;
    case "rejected":
      newState = { ...state };
      players = [
        ...newState.players.filter(element => element.id !== action.id)
      ];
      newState.players = players;
      newState.allAccepted = newState.players.length === 0 ? true : false;
      return newState;
    case "delete-the-last-catagory":
      newState = { ...state };
      let allCatagory = [...state.addCatagories.slice(0, 2)];
      quistions = [...state.quistions.slice(0, 2)];
      newState.quistions = quistions;
      newState.addCatagories = allCatagory;
      return newState;
    case "load-quistions":
      newState = { ...state };
      quistions = [...state.quistions, action.payload];
      newState.quistions = quistions;
      let addCatagories = [...state.addCatagories, action.id];
      newState.addCatagories = addCatagories;
      return newState;
    case "add-answer":
      newState = { ...state };
      let answers = [...newState.answers];
      let CheckingAnswer = answers.findIndex(
        answer => answer.teamId === action.teamId
      );
      console.log(CheckingAnswer);
      if (CheckingAnswer === -1) {
        answers.push({ teamId: action.teamId, answer: action.answer });
      } else {
        answers[CheckingAnswer].answer = action.answer;
      }
      newState.answers = answers;
      return newState;
    case "add-player":
      let newPlayer = [...state.players];
      let checking = newPlayer.findIndex(
        element => element.id === action.player.id
      );
      let isAccepted = state.acceptedPlayers.findIndex(
        element => element.id === action.player.id
      );
      if (isAccepted === -1) {
        if (checking !== -1) {
          newPlayer[checking].name = action.player.name;
        } else {
          newPlayer.push(action.player);
        }
      }
      newState = { ...state, players: newPlayer, allAccepted: false };

      return newState;
  }
  return state;
}
