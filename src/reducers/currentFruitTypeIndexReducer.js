import {SET_CURRENT_FRUIT_INDEX, SET_CURRENT_FRUIT_TYPE_INDEX} from "../actions/types";

export default function currentFruitTypeIndex(state = 0, action) {
  switch (action.type) {
    case SET_CURRENT_FRUIT_INDEX:
      return 0;
    case SET_CURRENT_FRUIT_TYPE_INDEX :
      return action.currentFruitTypeIndex;
    default :
      return state;
  }
}
