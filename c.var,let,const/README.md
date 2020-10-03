# var VS let, const

## var
* ES5
* 변수의 유효 범위: 함수 스코프
* 호이스팅 (O)
* 재선언 가능

## let, const
* ES6
* 변수의 유효 범위: 블록 스코프(친숙)
* 호이스팅 (X)
* 재선언 불가

* let, const를 지향하자.

### 호이스팅
```ts
console.log(hoisted_var) //undefined

// 변수를 아래서 선언했는데 사용이 위에서 됨
var hoisted_var = 'var'

console.log(hoisted_var); // var

console.log(hoisted_let); // Block-scoped variable 'hoisted_let' used before its declaration.

// 일반적으로 생각하는 변수 선언 규칙을 따름
let hoisted_let = 'let'
```

### 재선언
```ts
var redeclare_var: string = '한 번 선언 했는데';
var redeclare_var: string = '또 선언이 가능'
;

let redeclare_let = '한 번 선언 했기 때문에';
let redeclare_let = '또 선언 불가';
```

## let, const 타입 추론
```ts
let a: string = 'a'; // 명시적으로 지정된 타입인 string
let b = 'b'; // 타입추론에 의한 타입인 string

const c: string = 'c'; // 명시적으로 지정된 타입 string
const d = 'd'; // 타입추론에 의한 타입인 '리터럴' 'd'
```
