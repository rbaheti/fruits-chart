import {GET_FRUITS, SET_CURRENT_FRUIT_INDEX} from "./types";

import _getFruitsData from "../utils/api";

export function getFruits() {
  return dispatch =>
    _getFruitsData().then(fruits => {
      dispatch({
        type: GET_FRUITS,
        fruits
      });
    });
}

export function setCurrentFruitIndex(currentFruitIndex) {
  return dispatch =>
    dispatch({
      type: SET_CURRENT_FRUIT_INDEX,
      currentFruitIndex
    });
}
