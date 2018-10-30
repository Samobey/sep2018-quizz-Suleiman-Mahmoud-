const initialState = {
  component: "create",
  players: [],
  acceptedPlayers: []
};
let newState;
export default function(state = initialState, action) {
  console.log(state.players);
  switch (action.type) {
    case "choose-component":
      newState = { ...state };
      newState.component = action.component;
      return newState;
    case "accepted":
      newState = { ...state };
      newState.acceptedPlayers = [...state.players.filter(element=>element.id === action.id)];
      newState.players = [...state.players.filter(element=>element.id !== action.id)];
      return newState;
    case "add-player":
      let newPlayer = [...state.players];
      let checking = newPlayer.findIndex(
        element => element.id === action.player.id
      );
      console.log(checking);
      if (checking !== -1) {
        newPlayer[checking].name = action.player.name;
      } else {
        newPlayer.push(action.player);
      }
      newState = { ...state, players: newPlayer };

      return newState;
  }
  return state;
}
