# 인터페이스

## Without interface
```ts
const person: { name: string; age: number } = 
{
    name: 'Hwang',
    age: 28
};
```
## With interface
```ts
interface Person{
    name:string;
    age: number; 
}
const person: Person={
    name: 'Hwang',
    age: 28
}

function hello(p: Person): void
{
    console.log(`안녕하세요 ${p.name}입니다.`);
}
hello(person);
```
### Optional Property
```ts
interface Person{
    name:string;

    // ?: Optional Property
    age?: number; // age 프로퍼티가 있어도 되고 없어도 된다.
}
```

### Indexable type
#### String OR Number만 가능
```ts
interface StringArray{
    [index: number]:string;
}
const sa: StringArray = {}; // 옵셔널하다
sa[100]= '백';

interface StringDictionary {
    [index: string]: string;
}
const sd: StringDictionary = {}; //옵셔널하다
sd.hundred = '백';

interface StringArrayDictionary{
    [index: number]: string;
    [index: string]: string;
}

const sad: StringArrayDictionary = {};
// 옵셔널하다.
sad[100]='백';
sad.hundred='백';
```
#### string index = optional property
```ts
interface StringDictionary{
    [index: string]: string;
    name: string;
}
const sd: StringDictionary={
    name: '이름' //필수
};

sd.any = 'any'; // 어떤 프로퍼티도 가능

interface StringDictionaryNo{
    [index: string]: string;
    // name: number; //(X) 위에서 이미 모든 프로퍼티의 타입은 string이라고 정해놨기 때문에 name 프로퍼티를 number로 지정할 수 없다.
}
```

### Function in interface
```ts
interface Person{
    name: string;
    age: number;
    hello(): void;
    hello2(): void;
    hello3(): void;
}

const p1: Person = {
    name: 'Hwang',
    age: 28,
    hello: function(): void {
        console.log(this);
        console.log(`안녕하세요! ${this.name}입니다.`);
    },
    hello2(): void
    {
        console.log(this);
        console.log(`안녕하세요! ${this.name}입니다.`);
    },
    hello3: (): void =>
    {
        console.log(typeof this); // this: hello3 오브젝트 자체를 의미
        console.log(`안녕하세요! hello3입니다.`);
    },
};
p1.hello();
/*
{
  name: 'Hwang',
  age: 28,
  hello: [Function: hello],
  hello2: [Function: hello2],
  hello3: [Function: hello3]
}
안녕하세요! Hwang입니다.
*/

p1.hello2();
/*
{
  name: 'Hwang',
  age: 28,
  hello: [Function: hello],
  hello2: [Function: hello2],
  hello3: [Function: hello3]
}
안녕하세요! Hwang입니다.
*/
p1.hello3();
/*
object
안녕하세요! hello3입니다.
*/
```

### Class implements interface
```ts
interface IPerson
{
    name: string;
    age?: number;
    hello(): void;
}

class Person implements IPerson{
    name: string;
    constructor(name: string){
        this.name = name;
    }
    hello(): void{
        console.log(`안녕하세요! ${this.name}입니다.`);
    }
    public hi(): void{
        console.log('hi');
    }
}
const person:IPerson = new Person('Hwang');
person.hello(); // 안녕하세요! 'Hwang'입니다.
person.hi(); // (X) 인터페이스에는 hi 메소드가 없다.
```

### Interface extends interface
```ts
interface Person{
    name: string;
    age?: number;
}
interface Korean extends Person{
    city: string;
}
const k: Korean = {
    name:'Hwang',
    city: 'Seoul'
};
```

### Function interface
```ts
interface HelloPerson
{
    (name: string, age?: number): void;
}
let helloPerson: HelloPerson = function(name: string){
    console.log(`안녕하세요! ${name}입니다.`);
};
helloPerson('Hwang'); //안녕하세요! Hwang입니다.
/*
함수의 타입 체크는 할당할 때가 아니라 사용할 때 한다는 점을 명심
*/
```