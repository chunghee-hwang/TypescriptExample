# Decorator

## Decorator 사용 전 설정
* tsconfig.json에 ```"experimentalDecorators": true``` 추가
* 빌드는 Ctrl + Shit + B를 이용


각 데코레이터 당 시그니처가(데코레이터 함수의 파라미터) 모두 다르다

## Class Decorator

### Basic
```ts
function hello(constructorFn: Function){
    console.log(constructorFn);
}

// @hello
@hello
class Person {
}

new Person(); // 연결된 hello 메소드가 실행되면서 [class Person]이 출력된다.
```
#### 팩토리 방식
```ts
function hello(constructorFn: Function){
    console.log(constructorFn);
}

function helloFactory(show:boolean){
    if (show){ // show가 true일 때만 hello함수를 반환
        return hello;
    }
    else{
        return null;
    }
}

@helloFactory(true)
class Person {
}

new Person(); // [class Person] 출력, false이면 아무 것도 출력 안 함
```

### Advanced

```ts
// person 객체의 proto에 hello 함수 추가
function addHello(constructorFn: Function){
    constructorFn.prototype.hello = function() {
        console.log('hello');
    }
}

@addHello
class Person{
    constructor(){
        console.log('new Person()');
    }
}

const person = new Person();
(<any>person).hello(); // 단점은 <any>를 붙여줘야 오류가 안 난다.
/*
new Person()
hello
*/
```

## Method Decorator

```ts
function editable(canBeEdit: boolean){
    return function(target: any, propName: string, description: PropertyDescriptor){
        console.log({canBeEdit, target, propName, description});
        /*
        {canBeEdit: true, target: {…}, propName: 'hello', description: {…}}
            canBeEdit:true
            description:{value: ƒ, writable: true, enumerable: false, configurable: true}
                configurable:true
                enumerable:false
                value:ƒ hello() {\r\n        console.log('hello');\r\n    }
                writable:true
            __proto__:Object
            propName:'hello'
        */
        description.writable = canBeEdit; //함수를 수정 가능한지 여부 설정
    }
}

class Person{
    constructor(){
        console.log('new Person()');
    }
    @editable(true)
    hello(){
        console.log('hello');
    }
}

const person = new Person(); // new Person
person.hello(); // hello
person.hello = function(){
    console.log('world');
}
person.hello(); // world
```

## Property Decorator

```ts
// 프로퍼티의 값에 쓸 수 있는 여부 설정
function writable(canBeWrite: boolean){
    return function(target: any, propName: string): any{
        console.log({canBeWrite, target, propName});
        /*
        canBeWrite:false
        propName:'name'
        target:{constructor: ƒ, name: undefined}
            constructor:class Person {\r\n    constructor() {\r\n        this.name = 'hwang';\r\n        console.log('new Person()');\r\n    }\r\n}
            name:undefined
        */
        return {
            writable: canBeWrite
        };
    };
}

class Person{
    @writable(false) // 'name' 프로퍼티에 값을 쓸 수 없게 함
    name: string = 'hwang';

    constructor(){
        console.log('new Person()');
    }
}

const person = new Person();
/*
this.name = 'hwang';
          ^
TypeError: Cannot assign to read only property 'name' of object '#<Person>'
*/
```
## Parameter Decorator
```ts
function printInfo(target: any, methodName: string, paramIndex: number){
    console.log({target, methodName, paramIndex});
}

class Person{
    private _name: string;
    private _age: number;

    constructor(name: string, @printInfo age: number){
        this._name = name;
        this._age = age;
    }

    hello(@printInfo message: string){
        console.log(message);
    }
}
/*
hello 메소드로 인해 console 출력
{target: {…}, methodName: 'hello', paramIndex: 0}
    methodName:'hello'
    paramIndex:0
    target:{constructor: ƒ, hello: ƒ}
    constructor:class Person {\r\n    constructor(name, age) {\r\n        this._name = name;\r\n        this._age = age;\r\n    }\r\n    hello(message) {\r\n        console.log(message);\r\n    }\r\n}
    hello:ƒ hello(message) {\r\n        console.log(message);\r\n    }
    __proto__:Object

constructor로 인해 console 출력
{target: ƒ, methodName: undefined, paramIndex: 1}
    methodName:undefined
    paramIndex:1
    target:class Person {\r\n    constructor(name, age) {\r\n        this._name = name;\r\n        this._age = age;\r\n    }\r\n    hello(message) {\r\n        console.log(message);\r\n    }\r\n}
    __proto__:Object
*/
```