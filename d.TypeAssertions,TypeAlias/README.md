# Type assertions, Type alias

## Type assertions
### 특징
* 형 변환과는 다르다.
  - 형 변환은 실제 데이터 구조를 바꾼다.
* '타입이 이것이다'라고 컴파일러에게 알려주는 것을 의미
* 사용법
  - 변수 as 강제할 타입
  - <강제할 타입>변수

```ts
let someValue: any = 'this is a string';

let strLength: number = (<string>someValue).length;

let strLength: number = (someValue as string).length;
/*
1. 주로 넓은 타입에서 좁은 타입으로 강제하는 경우가 많다.
2. jsx에서는 as를 쓴다.
*/
```

## Type alias (타입 별칭)
* 인터페이스와 비슷해 보인다.
* Union Type, Tuple을 여러 번 쓸 때 이름을 지정할 수 있다.
* 직접 작성해야하는 타입을 다른 이름을 지정할 수 있다.
* 만들어진 타입의 refer로 사용하는 것이지 타입을 만드는 것은 아니다.

### Aliasing Primitive
```ts
type MyStringType = string;

const str = 'world';

let myStr: myStringType = 'hello';

myStr = str;

/*
별 의미가 없다
*/
```

### Aliasing Union Type
#### Without Aliasing
```ts
let a: any;
let b: string | number;

b = '스트링';
b = 0;

function test(arg: string | number): string | number
{
  return arg;
}
```
#### With Aliasing
```ts
let a: any;
type StringOrNumber = string | number;
let b: StringOrNumber;
b = '스트링';
b = 0;

function test(arg: StringOrNumber): StringOrNumber
{
  return arg;
}
```

### Aliasing Tuple
```ts
let person: [string, number] = ['Hwang', 28];
type PersonTuple = [string, number];
let another: PersonTuple = ['Anna', 24];
/*
튜플 타입에 별칭을 줘서 여러군데서 사용
*/
```

### 인터페이스와 차이점
```ts
type Alias = { num: number }

interface Interface 
{
  num: number;
}

declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
/*
1. type alias는 object literal type으로
2. interface는 interface로
*/
```
```ts
type PersonAlias = {
  name: string;
  age: number;
};

// 마치 인터페이스처럼 상속을 받을 수 있으나,
// 객체 리터럴을 가져오는 것이기 때문에 권장되지 않는다.
interface IPerson extends PersonAlias{

}

let ip: IPerson = {
  name: 'Hwang',
  age: 28
};

class PersonImpl implements PersonAlias{
  name: String;
  age: number;
  hello(){
    console.log('안녕하세요');
  }
}

let pi: PersonImpl = new PersonImpl();
pi.hello();

// 사용 불가
class PersonChild extends PersonAlias{

}
/*
1. type alias 끼리는 extends, implements 불가
2. interface extends type alias 가능
3. class implements type alias 가능
4. class extends type alias 불가(interface도 마찬가지)
5. 마치 interface 처럼 동작한다.
*/
```