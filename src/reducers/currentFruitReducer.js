import {SET_CURRENT_FRUIT} from "../actions/types";

export default function fruits(state = 0, action) {
  switch (action.type) {
    case SET_CURRENT_FRUIT :
      return action.currentFruit;
    default :
      return state;
  }
}
