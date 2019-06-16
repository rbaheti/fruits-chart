import {combineReducers} from "redux";
import fruits from "./fruitsReducer";
import currentFruitIndex from "./currentFruitIndexReducer";

export default combineReducers({
  fruits,
  currentFruitIndex
});
