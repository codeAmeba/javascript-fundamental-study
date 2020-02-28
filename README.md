# JS Study
- 자바스크립트를 다시 공부하며 놓쳤던 개념들을 정리함.
- 교재: 모던 자바스크립트 입문(이소 히로시 지음)

***
## 자바스크립트의 재탄생
- 자바스크립트는 기존의 다른 프로그래밍 언어들과 달리 불확실한 요소가 많아 외면 당했었다.
- 구글 지도에서 선보인 Ajax라는 비동기 통신 기술 덕분에 자바스크립트가 재탄생하며, 관심을 받게 되었다.
- HTML5와 ES5의 등장은 자바스크립트에 날개를 달아주었다.

## 변수(variable)
- 변수는 값이 저장된 특정 메모리 영역을 가리키는 이름이다.
- 변수에 값을 할당하지 않고 선언만 하면 `undefined`가 담겨있다.
- `var`, `let`, `const` 등의 키워드 없이 선언된 변수는 전역변수로 취급한다.

## 변수 호이스팅(hoisting)
```javascript
console.log(a); // undefined
var a = 3;
console.log(a); // 3
```
- 프로그램 중간에서 변수를 선언하더라도 첫머리에 선언된 것처럼 작동하는데, 이것을 **호이스팅** 이라고 한다.
- 단, 호이스팅이 되는 것은 선언문 뿐이며, 자동으로 undefined로 초기화 된다.

## getMonth() 메서드에 +1을 해야 하는 이유
- `new Date()` 메서드 사용 시 `getMonth()` 는 0~11이기 때문에 **+1**을 해줘야 한다.
```javascript
const now = new Date();
console.log(`오늘은 ${now.getMonth()+1} 월 ${now.getDate()} 일입니다.`); //오늘은 2 월 19 일입니다.

console.log(now.getMonth()); //1
```

## 함수(function)의 동작원리
- 함수를 호출하며 인수(argument)를 전달하면, 함수 정의문의 인자(parameter)로 받아 실행 결과를 반환(return)한다.
- **자판기의 이미지가 연상됨.**
> 1. 특정 음료의 가격에 맞는 금액 투입(argument)
> 2. 특정 음료의 버튼 누름(call)
> 3. 투입된 금액과 호출된 음료의 값을 비교
> 4. 가격이 맞으면 해당 음료 반환(return)

## 자바스크립트의 함수는 일급객체
- 함수를 값으로 쓸 수 있음. -> 변수에 할당 가능
- 다른 함수의 인수(argument)로 전달 가능

## 함수 선언문의 호이스팅
- 변수와 마찬가지로 호이스팅이 됨
```javascript
console.log(square(5)); // 25

function square(x) {
  return x * x;
}
```
- return이 없으면 undefined
```javascript
console.log(square(5)); // undefined

function square(x) {
  x * x;
}

console.log(square(3)); // undefined
```

## 값의 전달, 참조의 전달
```javascript
function add1(x) {
  return x = x + 1;
}

var a = 3;
var b = add1(a);

console.log(`a = ${a}, b = ${b}`); // a = 3, b = 4
```
- 위와 같이 인수로 원시값(primitive-type)을 전달하면, 해당 값 자체가 복사되어 전달된다. 이것을 **값의 전달** 또는 **깊은 복사(deep copy)** 라고 한다.
- 별도의 메모리 공간에 복사되는 것이기 때문에 변수 a와 인자 x는 별개의 값이며, x의 값이 바뀌더라도 a가 영향을 받지 않는다.

```javascript
function add1(p) {
  p.x = p.x + 1;
  p.y = p.y + 1;
  return p;
}

var a = {x:3, y:4};
var b = add1(a);

console.log(a, b); // { x: 4, y: 5 } { x: 4, y: 5 }
```
- 반면에 인수로 객체(object-type)을 전달했을 때에는 참조(reference)가 전달되는 것으로 이를 **참조 전달** 또는 **얕은 복사(shallow copy)** 라고 한다.
- 하나의 메모리 공간에 있는 객체를 각기 다른 곳에서 가리키고 있다는 이미지로 이해할 수 있으며, 따라서 p의 값이 바뀌자 a의 값도 바뀐 것이다.

## 스코프
```javascript
var a = 'global';

function f() {
  var b = 'local';
  console.log(a); // global
  return b;
}

f();
console.log(b); // ReferenceError: b is not defined
```
- 위와 같이 함수 내부의 변수가 출력되지 않는 이유는 스코프(scope) 때문이다.
- 기본적으로 **내부에서는 외부를 볼 수 있지만, 외부에서는 내부를 볼 수 없다** 는 개념으로 이해할 수 있다.
- 코드가 작성되는 시점에 구문만으로 정해지는 스코프를 어휘적 스코프(lexical scope)라고 하며, 코드가 실행되는 와중에 정해지는 스코프를 동적 스코프(dynamic scope)라고 한다. **자바스크립트는 lexical scope를 따른다**
- 스코프가 존재하는 가장 큰 이유는 식별자(identifier)의 충돌을 막기 위함이다.

## 메서드(method)
```javascript
var circle = {
  center: { x:1.0, y:2.0 }, // 원의 중심
  radius: 2.5, // 원의 반지름
  area: function () { // 원의 넓이를 구하는 메서드
    return Math.PI * this.radius * this.radius;
  }
};

circle.translate = function(a, b) { // 새로운 메서드를 추가하여 원을 이동
  this.center.x = this.center.x + a;
  this.center.y = this.center.y + b;
};

circle.translate(1, 2);
circle.center; // {x: 2, y: 4}
```
- 자바스크립트에서는 객체 내부의 데이터는 모두 프로퍼티(property)이며, 프로퍼티가 함수를 값으로 가질 때, 일반 프로퍼티와 구분하기 위해 **메서드(method)** 라고 칭한다.
- 일반적으로 메서드는, 메서드가 속한 객체의 내부 데이터(프로퍼티 값) 상태를 바꾸는 용도로 사용한다.

## 함수를 사용하는 이유
1. **재사용이 가능하다.**
  - 동일한 작업이 반복될 경우 해당 작업을 하는 함수를 만들어 필요한 곳에서 호출만 하면 되기 때문에 코드가 간결해진다.

2. **프로그램을 이해하기 쉽다.**
  - 함수의 이름을 알아보기 쉽게 지으면, 함수명만 보고도 프로그램의 흐름을 파악하기 쉽다.

3. **프로그램의 수정이 간단해진다.**
  - 수정해야 할 일이 있을 때 해당되는 함수만 수정하면 된다.

## 생성자 함수
- Java나 C++ 등의 객체지향 언어에는 **클래스(class)** 라는 객체 생성 방법이 있다.
- 자바스크립트에는 클래스가 없지만, 대신 **프로토타입(prototype)** 이 있기 때문에 클래스와 유사한 방식으로 객체를 생성할 수 있다.
- 생성자 함수를 통해 **동일한 이름에 프로퍼티 값이 다른 객체** 를 효율적으로 생성할 수 있다.

```javascript
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

const card = new Card('Heart', 'A');
console.log(card); // Card { suit: 'Heart', rank: 'A' }
```

- 이때, 통상적으로 생성자 함수라는 것을 알리기 위해 **파스칼 케이스**를 쓴다.
- 이와 같이 생성된 객체를 **인스턴스** 라고 부르는데, 본래 객체지향 언어에서의 인스턴스와는 차이가 있지만, 일반 객체와 구분하기 위해 편의상 인스턴스라고 부른다.
- `this` 는 생성자가 생성하는 객체를 가리킨다. 즉, 생성자 함수 내부의 `this` 는 인스턴스를 가리킨다고 볼 수 있다.
- **참고:** 
  - [‘new’ 연산자와 생성자 함수](https://ko.javascript.info/constructor-new)
  - [클래스와 기본 문법](https://ko.javascript.info/class)
  - [Classes - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

## 자바스크립트의 객체
- 자바스크립트의 객체는 크게 **세 종류** 로 구분할 수 있다.

1. **네이티브 객체**
  - ECMAScript 스펙에 따라 정의된 객체를 네이티브 객체(native object)다. 
  - Array, Function, Number 등의 내장 생성자로 생성된 객체와 JSON, Math, Reflect 등이 네이티브 객체에 포함된다.

2. **호스트 객체**
  - 자바스크립트 실행 환경에 정의된 객체를 호스트 객체(host object)라고 한다.
  - Window, Navigator, History, Screen 등 브라우저 객체와 DOM 객체, Ajax를 위한 XMLHttpRequest 객체, HTML5의 여러 API에 이르기까지 클라이언트 측 자바스크립트에 정의된 객체들이 포함된다.

3. **사용자 정의 객체**
  - 사용자가 직접 정의한 코드의 실행 결과로 생성된 객체를 말한다.

## 희소 배열(sparse array)
```javascript
const a = ['A', 'B', 'C'];
a[4] = 'E';
console.log(a); // ["A", "B", "C", empty, "E"]
console.log(a[3]); // undefined
console.log(a.length); // 5
a.hasOwnProperty("3"); // false
```
- 위와 같이 `length`가 요소의 개수보다 클 때 **희소 배열** 이라고 부른다.
- 이때 배열은 내부적으로 **객체** 의 형태로 저장되어 있으며, 리터럴로 표현하자면 아래와 같다.
```javascript
const a = {
  '0':'A',
  '1':'B',
  '2':'C',
  '4':'E'
};
```
## 표현식(expression)
- 표현식이란 결과적으로 어떤 값으로 평가(evaluation)되는 것
- number, string, boolean 등의 원시 값(primitive value)은 그 자체로 가장 간단한 표현식이라고 할 수 있다.
```javascript
3.14
"hello"
true
null
```
- 변수, 프로퍼티, 배열 요소, 함수 호출, 메서드 호출 등 또한 표현식이라고 할 수 있다.
```javascript
sum
circle.radius
a[3]
square(5)
card.getSum()
```
- 연산자가 더해지더라도 결과적으로 값으로 평가된다면 역시 표현식이다.
  - 단항 연산자, 이항 연산자, 삼항 연산자 모두 그렇다.
```javascript
const a = 1;
const b = 2;
const c = a !== b ? 'hello' : 'world';
console.log(c); // hello
```

## 자바스크립트의 문자열은 불변(immutable)
- 자바스크립트는 원시 값을 처리할 때 원시 값을 래퍼(wrapper) 객체로 자동 변환한다.
  - 문자열은 String 객체, 숫자는 Number 객체, 논리값은 Boolean 객체
  - null과 undefined는 래퍼 객체가 없음.
- 래핑은 일시적으로 진행되며 처리가 끝나면 곧바로 메모리에서 삭제된다.
- **따라서 문자열을 직접 객체화 하지 않더라도 String 객체의 메서드를 사용할 수 있다.**
- 또한, **자바스크립트의 문자열은 불변** 이므로 메서드를 통해 반환되는 새로운 문자열은 원본 문자열과 별개의 값이다.
```javascript
const randomString = 'microsoft';
const newString = randomString.replace('soft', 'hard');
console.log(randomString); // microsoft
console.log(newString); // microhard
```
- **참고**
  - [문자열](https://ko.javascript.info/string)

## truthy와 falsy
- true나 false로 명시되어 있지 않더라도 논리값으로 평가되는 피연산자들이 있다.
- **true로 평가되는 피연산자**
  - 0을 제외한 숫자, 빈 문자열을 제외한 문자열, 모든 객체, 심벌
- **false로 평가되는 피연산자**
  - 0, -0, 빈 문자열(""), NaN, null, undefined
- truthy와 falsy에 각각 속한 피연산자들을 보면 나름대로의 일관성이 보이는 것을 알 수 있다. 대체적으로 **없음** 의 뉘앙스가 강한 쪽이 false로 평가된다.

## 