import fruits from "./_DATA";

export default function _getFruitsData() {
  return new Promise((res, rej) => {
    res(fruits);
  });
}
