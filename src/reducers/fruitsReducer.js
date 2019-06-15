import {GET_FRUITS} from "../actions/types";

export default function fruits(state = [], action) {
  console.log("actions: ", action);
  switch (action.type) {
    case GET_FRUITS :
      console.log("got GET_FRUITS action.");
      return action.fruits;
    default :
      return state;
  }
}
