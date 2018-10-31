const initialState = {
  component: "create",
  players: [],
  acceptedPlayers: [],
  allAccepted: false,
  catagories: [],
  quistions: [],
  addCatagories: [],
  selectedQuistions: []
};
let newState, players, quistions;
export default function(state = initialState, action) {
  switch (action.type) {
    case "choose-component":
      newState = { ...state };
      newState.component = action.component;
      return newState;
    case "load-catagories":
      newState = { ...state };
      newState.catagories = [...action.payload];
      return newState;
    case "add-quistion":
      newState = { ...state };
      if(newState.selectedQuistions.includes(action.id)){
        newState.selectedQuistions = [...state.selectedQuistions.filter(element => element !== action.id)];
      }else{
        newState.selectedQuistions = [...state.selectedQuistions,action.id];
      }
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
