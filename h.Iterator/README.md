# Iterator

* ES3
    ```js
    for(var i = 0; i < array.length; i++)
    ```
* ES5
    return으로 순회를 탈출할 수 없다.
    ```js
    array.forEach()
    ```
* ES6
    배열에서만 사용 가능
    ```js
    for(const item of array)
    ```

## Example
```ts
const array = ['first', 'second'];
const obj = {
    name:'hwang',
    age: 28
}

// 배열에 for...of 이용
for(const item of array){
    console.log(typeof item + ', '+ item);
    /*
    string, first
    string, second
    */
}

// 배열에 for...in 이용
for(const item in array){
    console.log(typeof item + ', ' + item);
    /*
    string, 0
    string, 1
    */
}

// 객체에 for...of 이용 -> 오류
/*
for (const item of obj){}
*/

// 객체에 for...in 이용
for (const item in obj){
    console.log(item);
    /*
    name
    age
    */
}
```

## Symbol.iterator
* 프로퍼티이며, 함수가 구현되어있으면, iterable이라고 한다.
* Array, Map, Set, String ,Int32Array, Uint32Array, etc.에는 내장 구현체가 있으므로 이터러블하다.
* 일반 객체는 이터러블하지 않다.
* 이터레이터를 통해 이터러블한 객체의 Symbol.iterator 함수를 호출한다.
* target: es3 or es5
    * Array에서만 for...of 사용 가능
    * 일반 객체에 사용하면 오류
* target: es6
    * Symbol.iterator 함수를 구현하면 어떤 객체에도 for...of 사용 가능

## Custom Iterable

```ts
class CustomIterable implements Iterable<string>{
    private _array: Array<string> = ['first', 'second'];

    [Symbol.iterator](){
        var nextIndex = 0;

        return {
            next: () => {
                return {
                    value: this._array[nextIndex++],
                    done: nextIndex > this._array.length
                }
            }
        }
    }
}

const cIterable = new CustomIterable();
for(const item of cIterable){
    console.log(item);
    /*
    first
    second
    */
}
```