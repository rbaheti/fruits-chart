import {combineReducers} from "redux";
import fruits from "./fruitsReducer";
import currentFruit from "./currentFruitReducer";

export default combineReducers({
  fruits,
  currentFruit
});
