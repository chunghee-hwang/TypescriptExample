## 기본 자료형

사용자가 만든 타입은 결국 기본 자료형들로 쪼개진다.
* JS 기본 자료형을 포함
    * boolean
        ```ts
        let isDone: boolean = false; // primitive
        typeof isDone === 'boolean' // true
        let isOk: Boolean = true; // wrapper obejct
        let isNotOk: boolean = new Boolean(true); // 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible. 오류 발생
        ```
    * number  
      - JS와 같이 TS의 모든 숫자는 부동 소수점 값
      - TS는 16진수, 10진수 리터럴 외에도 ES6에 도입된 2진수, 8진수 지원   
      ```ts
      let decimal: number = 6; // 10진수 리터럴
      let hex: number = 0xf00d; // 16진수 리터럴
      let binary: number = 0b1010; // 2진수 리터럴
      let octal: number = 0o744; // 8진수 리터럴
      ``` 
    * string  
      * Template String  
        * 행에 걸쳐 있거나, 표현식을 넣을 수 있는 문자열
        * `기호 사용
      ```ts
      let fullName: string = `Bob Bobbington`;
      let age: number = 37;
      let sentance: string = `Hello, my name is ${ fullName }.`;
      console.log(`I'll be ${ age + 1 } years old next month.`);
      ```
    * null  
      * null이라는 값으로 할당된 것  
      * 무언가가 있는데, 사용할 준비가 덜 된 상태
      * null타입은 null만 가질 수 있다.
      * 런타임에서 typeof 연산자를 이용해서 알아내면, object 출력됨
      ```ts
      let n: null = null;
      console.log(n); // null
      console.log(typeof n); // object
      ```
    * undefined  
      * 값을 할당하지 않은 변수는 undefined를 가짐
      * 무언가가 아예 준비가 안된 상태
      * object의 property가 없을 때도 undefined
      * 런타임에서 typeof 연산자를 이용해서 알아내면, undefined 출력됨
      ```ts
      let u: undefined = undefined;
      console.log(u); // undefined
      console.log(typeof u); // undefined
      ```
    
    * null & undefined  
      * void와 마찬가지로 undefined와 null은 그 자체로는 쓸모가 없다.
      ```ts
      let u: undefined = undefined;
      let n: null = null;
      ```
      * Undefined & null are subtypes of all other types.  
        * number에 null 또는 undefined를 할당 할 수 있다.
        * 하지만, 컴파일 옵션에서 '--strictNullChecks' 사용하면, null과 undefined는 void나 자기 자신들에게만 할당 가능
          * 이 경우, null과 undefined를 할당할 수 있게 하려면, union type을 이용해야 함
      ```ts
      let name: string = null;
      let age: number = undefined;

      // strictNullChecks => true
      // Type 'null' is not assignable to type 'string'
      let name: string = null; //(X)

      // null => null || void, undefined => undefined || void
      // Type 'null' is not assignable to type 'undefined'.
      let u: undefined = null; //(X)
      let v: void = undefined; //(O)
      
      let union: string | null | undefined = 'str';
      ```

      
    * symbol(ECMAScript 6에 추가)
      * ES6의 Symbol과 같음
      * 프리미티브 타입의 값을 담아서 사용
      * 고유하고 수정 불가능한 값으로 만들어 준다.
      * 접근 제어하는 데 쓰는 경우가 많다.
    * array: object 형
      * 사용 방법
        * Array<타입>
        * 타입[]
      ```ts
      let list: number[] = [1, 2, 3];
      let list: Array<number> = [1, 2, 3];
      ```
      ```ts
      interface Person
      {
          name:string;
          age: number;
      }
      
      const p: Person = {
          name: 'hwang',
          age: 28
      }
      let persons: Person[] = [];
      let persons2: Array<Person> = [];
      ```

* 프로그래밍을 도울 추가 타입
    * any
      * 어떤 타입이어도 상관없는 타입
      * 컴파일할 때, 타입 체크가 정상적으로 이뤄지게 하기 위해, 최대한 쓰지 말아야 한다.
      * any를 쓰면 오류가 발생하도록 하는 옵션도 있다.
        * noImplicitAny
      ```ts
      function returnAny(message:string): any
      {
          console.log(message);
      }
      returnAny('리턴은 아무거나');
      ```
    * void
      * 타입이 없는 상태
      * `any`와 반대의 의미를 가짐
      * 주로 함수의 리턴이 없을 때 사용. 그 외에는 사용할 일이 거의 없다.
      ```ts
      function returnVoid(message:string): void
      {
          console.log(message);
      }
      returnVoid('리턴이 없다.');
      ```
    * never
      * 함수 리턴을 할 수 없을 때(예외 발생, 무한 루프) 사용
      ```ts
      function error(message:string): never
      {
          throw new Error(message);
      }

      // Inferred return type is never
      function fail()
      {
          return error("Something failed");
      }

      // Function returning never must have unreachable end point
      function infiniteLoop(): never
      {
          while (true){}
      }
      ```
    * enum
      * 숫자 미 지정하면 0 부터 시작
      * 숫자 지정하면 그 숫자부터 순차적으로 증가
      ```ts
      enum Color {Red = 1, Green, Blue}
      let colorName: string = Color[2];
      let color: Color = Color.Red;
      console.log(color, colorName); // 1, Green
      ```
    * tuple: object형
      * 배열인데 타입이 한 가지가 아닌 경우 사용
      * 꺼내 사용할 때 주의가 필요하다.
      ```ts
      // Declare a tuple type
      let x: [string, number];
      // Initialize it
      x = ['Hello', 10]; // OK
      // Initialize it incorrectly
      x = [10, 'Hello']; // Error

      x[0] = 'world';
      console.log(x.toString()); // OK, 'string' and 'number' both have 'toString'
      x[1] = true; // Error, 'boolean' isn't 'string | number'
      ```



* Primitive Type  
오브젝트와 레퍼런스 형태가 아닌 실제 값을 저장하는 자료형  
프리미티브 형 내장 함수를 사용 가능한 것은 자바스크립트의 처리 방식 덕분
    ```javascript
    let name = 'mark'
    name.toString()
    ```

* Literal  
    * 값 자체가 변하지 않는 값
    * 상수와 다른 것은 상수가 가리키는 포인터가 고정이라는 것. 리터럴은 그 자체가 값이자 그릇
    ```javascript
    15; // number 리터럴
    'hwang' // string 리터럴
    //object 리터럴
    {
        name: 'hwang',
        age: 28
    }
    ```