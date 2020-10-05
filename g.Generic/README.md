# Generic

템플릿 라이브러리 처럼 여러가지 데이터 타입에 대응하여 동작을 하도록 도와준다.

```ts
function helloString(message: string): string{
    return message;
}

function helloNumber(message: number): number{
    return message;
}

// 더 많은 반복되는 함수들

function hello(message: any): any{
    return message;
}

function helloGeneric<T>(message: T): T{
    return message;
}

console.log(hello('Hwang').length);
console.log(hello(28).length);
console.log(helloGeneric(35).toString()); // 35를 number로 추론함
console.log(helloGeneric<number>(35).toString());
console.log(helloGeneric<number>('aa')) // Argument of type 'string' is not assignable to parameter of type 'number'.

// hello의 리턴이 any이기 때문에 헬퍼가 제대로 되지 않음
// helloGeneric을 사용하면 정상적으로 사용 가능
```

## 배열에서의 Generic
```ts
const a: string[] = [];
const b: Array<string> = [];

function hello<T>(messages: T[]): T{
    return messages[0];
}

console.log(hello<string>(['Hello', 'World']));
```

## Generic with Type alias
Generic을 타입 별칭으로도 사용할 수 있다.
```ts
type HelloGeneric = <T>(message: T) => T;

const hello: HelloGeneric = <T>(message: T): T=>{
    return message;
}

console.log(hello<string>('Hello').length);
```

## Generic with class
클래스에도 Generic을 설정할 수 있다.
```ts
class Person<T>
{
    private _name: T;
    private _age: number;

    constructor(name: T){
        this._name = name;
    }
}

new Person<string>('Hwang');
new Person<number>(3421);
new Person<string>(1313); // (X)
new Person('Hwang');
new Person(3421);
```

## Generic with extends
```ts
class Person<T extends string | number>{
    private _name: T;
    private _age: T;
    constructor(name: T)
    {
        this._name = name;
    }
}

new Person('Hwang');
new Person(28);
new Person(true); // (X)
/*
T가 string 또는 number를 상속받았기 때문에 boolean은 안 된다.
*/
```
```ts
class Person<T, K>{
    private _name: T;
    private _age: K;
    constructor(name: T, age: K)
    {
        this._name = name;
        this._age = age;
    }
}

new Person('Hwang', 28);
```

## Type lookup system
```ts
interface Person{
    name: string;
    age: number;
}

const person: Person = {
    name: 'Hwang',
    age: 28
}

type ko = keyof Person; // Person의 프로퍼티의 리터럴 string인 "name" | "age"를 뽑음

//               Person 객체, Person의 프로퍼티인 "name","age"만 올 수 있다.
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void{
    obj[key] = value;
}


//                      T,    K extends keyof T
console.log(getProperty(person, 'name'));

//          T,    K extends keyof T
setProperty(person, 'name', 'Anna');
console.log(getProperty(person, 'name'));
```