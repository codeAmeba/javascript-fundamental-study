// ...(spread operator)는 이터러블한 객체를 반환하는 표현식 앞에 쓸 수 있으며,
// 이를 통해 이터러블 객체를 배열 또는 함수의 인수 목록으로 펼칠 수 있다.

// 이터러블 객체를 풀어줌
console.log(...'ABC'); // A B C
console.log(...[1, 2, 3, 4]); // 1 2 3 4
console.log([1, ...[2, 3, 4], 5]) // [1, 2, 3, 4, 5]

// 인수를 전달할 때 풀어서 전달
const favorFruits = (fruit) => {
  let myFavor = [];
  // fruit.forEach((val) =>  myFavor.push(val));
  myFavor.push(fruit);
  return console.log(myFavor);
}

const fruits = ['apple', 'grape', 'melon', 'cherry'];
favorFruits(fruits); // [["apple", "grape", "melon", "cherry"]]
favorFruits(...fruits); // ["apple"]


// ...을 사용하여 concat 대신 push로 연결 가능
const newFruits = ['mango', 'blueberry'];
fruits.push(...newFruits);
console.log(fruits); // ["apple", "grape", "melon", "cherry", "mango", "blueberry"]

// 배열 내 최댓값 구하기
const nums = [3, 12, 72, 35, 56, 5, 88, 2, 17, 29, 47];
console.log(Math.max(...nums)); // 88

