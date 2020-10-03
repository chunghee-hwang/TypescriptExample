# 클래스

## 클래스 만들기
* 생성자 함수가 없으면 디폴트 생성자가 불린다.
* 클래스의 프로퍼티 혹은 멤버 변소구가 정의되어 있지만, 값을 대입하지 않으면 undefined이다.  
   &gt; 오브젝트에 프로퍼티가 아예 존재하지 않는다.
* 접근 제어자 (Access Modifier)는 public이 디폴트이다.
```ts
class Person{
    name: string;
    age: number = null;
}
const person: Person = new Person();
console.log(person); // Person {}
person.age = 28;
console.log(person.name) // undefined
console.log(person.age) // null
```

## 클래스와 프로퍼티
```ts
class Person {
    name: string;
    age: number;
    constructor(){
        console.log(this.name === null); // false
        console.log(this.name == undefined) // true
    }
}

const person: Person = new Person();
person.name = 'Hwang';
person.age = 28;
console.log(person); // Person { name: 'Hwang', age: 28 }
```

## 클래스와 프로퍼티 (2)
* 클래스의 프로퍼티를 선언과 동시에 값을 할당하는 방법도 있다.
* 생성자가 불리기 전에 이미 프로퍼티의 값이 저장되어 있음을 알 수 있다.
```ts
class Person{
    name: string= 'Hwang';
    age: number = 28;
    constructor(){
        console.log(this.name); // 'Hwang'
    }
}

const person: Person = new Person();
console.log(person); // Person { name: 'Hwang', age: 28 }
```

## 클래스와 프로퍼티의 접근 제어자
* private로 설정된 프로퍼티는 dot으로 접근할 수 없다.
* 클래스 내부에서는 private 프로퍼티를 사용할 수 있다.
* private이 붙은 변수나 함수는 _를 이름 앞에 붙이는데, 이는 문법이 아니라 널리 쓰이는 코딩 컨벤션이다.
```ts
class Person{
    public name: string;
    private _age: number;
    constructor(age: number){
        this._age = age;
    }
}

const person: Person = new Person(28);
person.name = 'Hwang';
// person._age (X)
console.log(person) // Person {name: 'Hwang', _age: 28}
```

## 클래스와 프로퍼티의 접근 제어자
* 부모에서 private로 설정된 프로퍼티는 상속을 받은 자식에서 접근할 수 없다.
* protected로 설정된 프로퍼티는 상속을 받은 자식에서 접근이 가능하다.
```ts
class Parent{
    private privateProp: string;
    protected protectedProp: string;
    constructor(){}
}
class Child extends Parent{
    constructor(){
        super();
        this.protectedProp = 'protected';
        // this.privateProp = 'private'; // (X)
    }
}
```

## 클래스와 메서드
* 클래스 내부에 작성된 메소드는 public이 디폴트
* arrow function으로 작성 가능
* private를 이용하면 클래스 외부에서 접근 불가
```ts
class Person{
    constructor(private _name: string, private _age: number){}

    print(): void{
        console.log(`이름은 ${this._name}이고, 나이는 ${this._age}입니다.`);
    }
    private printAge(): void{
        console.log(`나이는 ${this._age}입니다.`);
    }
}
const Person: Person = new Person('Hwang', 28);
person.print();
person.printAge(); // (X)
```

## 클래스와 상속(1)
```ts
class Parent {
    constructor(protected _name: string, protected _age: number){ }
    print(): void{
        console.log(`이름은 ${this._name}이고, 나이는 ${this._age}입니다.`);
    }
}

class Child extends Parent {
    constructor(){
        super('Hwang', 5) // 반드시 super 호출해야함
        // 안 쓸 경우 다음 오류 발생
        // Constructors for derived classes must contain a 'super' call.
    }
}
const p: Child = new Child();
p.print(); // 이름은 Hwang이고, 나이는 5입니다.
```
## 클래스와 상속(2)
* 생성자를 정의하고, this를 사용하려면, super를 통해 부모의 생성자를 호출해줘야한다.
* super를 호출할 때는 부모 생성자의 입력 타입과 같아야한다.
* super를 호출하는 것은 클래스 외부에서 호출하는 것과 같다.
* protected 함수를 호출해서 그 안의 private을 출력하는 것에 주의한다.
```ts
class Parent{
    constructor(protected _name: string, private _age: number){ }
    protected printAge(): void{
        console.log(`나이는 ${this._age}입니다.`);
    }
}
class Child extends Parent {
    constructor(age: number){
        super('Hwang', age)
        this.printAge();
    }
}
const p: Child = new Child(1);
// 나이는 1살 입니다.
```

##  클래스와 getter, setter
```ts
class Person{
    constructor(private _name: string){ }
    get name(){
        return this._name;
    }
    set name(name: string){
        this._name = `${name} Hwang`;
    }
}
const person: Person = new Person('Koo');
console.log(person.name); // getter
person.name='Koo2'; // setter
```

## 클래스와 static 프로퍼티
* static 키워드를 붙인 프로퍼티는 클래스.프로퍼티를 사용한다.
* static 프로퍼티에 private, protected를 붙이면 똑같이 동작한다.
```ts
class Person {
    public static CITY = "";
    private static LAST_NAME: string = 'Hwang';
    private _name: string;
    private _age: number;
    
    constructor(name: string, age: number){
        this._name = name;
        this._age = age;
    }

    public print() {
        console.log(`${this._name} ${Person.LAST_NAME} in ${Person.CITY}.`);
    }
}
const person: Person = new Person('Koo', 28);
Person.CITY = 'Seoul';
person.print(); // Koo Hwang in Seoul. 
```

## 모듈에서 private static 프로퍼티 혹은 메소드

```ts
class Person {
    private static PROPERTY = '프라이빗 프로퍼티';
    private static METHOD(){
        console.log('프라이빗 메서드');
    }
    constructor(){
        console.log(Person.PROPERTY);
        Person.METHOD();
    }
}

////////////////////

const PROPERTY = '모듈 내 변수';
function METHOD(){
    console.log('모듈 내 함수');
}

export class Person {
    constructor(){
        console.log(PROPERTY);
        METHOD();
    }
}
```

## Abstract Class
1. abstract 키워드가 사용된 클래스는 new로 생성할 수 없다.
2. abstract 키워드가 사용된 클래스를 상속하면 abstract 키워드가 붙은 함수를 구현해야한다.
```ts
abstract class APerson{
    protected _name: string = 'Hwang';
    abstract setName(name: string):void;
}
class Person extends APerson{
    setName(name: string):void{
        this._name = name;
    }
}
// const person = new APerson(); // (X)
const Person = new Person();
```

## Class와 private constructor
* 생성자 함수 앞에 접근제어자인 private을 붙일 수 있다.
* 외부에서 생성이 불가능하다. 
```ts
class Preference{
    private constructor(){

    }
}
// const p: Preference = new Preference(); // (X)
```

## Class와 readonly
* private readonly로 선언한 경우, 생성자는 할당이 가능하다. 하지만 생성자 이외에는 할당이 불가능하다.
* public readonly로 선언한 경우, 클래스 외부에서 다른 값을 할당할 수 없다. 마치 getter만 있는 경우와 같다.
```ts
class Person{
    private readonly _name: string = null;
    public readonly age: number = 28;
    constructor(name: string){
        this._name=  name;
    }

    public setName(name: string){
        // this._name = name; (X)
    }
}
const p: Person = new Person('Hwang');
console.log(p.age);
// p.age = 28; // (X)
```