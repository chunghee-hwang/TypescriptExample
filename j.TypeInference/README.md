# 타입 추론

* 기본적으로 타입을 명시적으로 쓰지 않을 때 추론하는 방법에 대한 규칙
  * 명시적으로 쓰는 것은 타입 추론이 아니라 코드를 읽기 좋게 하는 지름길
* let은 기본적으로 우리가 아는 기본 자료형으로 추론
* const는 리터럴 타입으로 추론
  * 오브젝트 타입을 쓰지 않으면, 프로퍼티는 let처럼 추론
  ```ts
  const person = {name: 'hwang', age: 28};
  ```
  이면
  ```ts
  person => {name: string, age: number}
  ```
  로 추론

* 대부분은 추론이 쉽다.
  * 단순 변수
  * structuring, destructuring
* array, 함수의 리턴에서는 원하는대로 얻기 힘들다.

## 배열 타입 추론
```ts
const array1 = []; // any
const array2 = ['a', 'b', 'c']; // string[]
const array3 = ['a', 1, false]; // (string | number | boolean)[]

class Animal {
    name: string;
}

class Dog extends Animal{
    dog: string;
}

class Cat extends Animal {
    cat: string;
}

const array4 = [new Dog(), new Cat()] // (Dog | Cat)[]
```

## 리턴 타입 추론

```ts
/*
function hello(message: string | number): "world" | 0
*/
function hello(message: string | number){
    if(message === 'world'){
        return 'world';
    }
    else{
        return 0;
    }
}
```

## 유니온 타입과 타입 가드
타입 추론 결과에 따라 출력값을 다르게 설정
```ts
interface Person{
    name: string;
    age: number;
}

interface Car{
    brand: string;
    wheel: number;
}

// 타입 가드 함수
function isPerson(arg: any): arg is Person {
    return arg.name !== undefined;
}

function hello(arg: Person | Car){
    if(isPerson(arg)){
        console.log(arg.name);
    }else{
        console.log(arg.brand);
    }
}

const p: Person = {name:'hwang', age:13};
const c: Car = {brand:'kia', wheel:480};
hello(p); // hwang
hello(c); // kia
```