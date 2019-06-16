import {GET_FRUITS} from "../actions/types";

export default function fruits(state = [], action) {
  switch (action.type) {
    case GET_FRUITS :
      return action.fruits;
    default :
      return state;
  }
}
