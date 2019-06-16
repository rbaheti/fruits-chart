import {SET_CURRENT_FRUIT_INDEX} from "../actions/types";

export default function currentFruitIndex(state = 0, action) {
  switch (action.type) {
    case SET_CURRENT_FRUIT_INDEX :
      return action.currentFruitIndex;
    default :
      return state;
  }
}
