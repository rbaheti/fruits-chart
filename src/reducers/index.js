import {combineReducers} from "redux";
import fruits from "./fruitsReducer";
import currentFruitIndex from "./currentFruitIndexReducer";
import currentFruitTypeIndex from "./currentFruitTypeIndexReducer";

export default combineReducers({
  fruits,
  currentFruitIndex,
  currentFruitTypeIndex
});
