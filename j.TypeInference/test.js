// 타입 가드 함수
function isPerson(arg) {
    return arg.name !== undefined;
}
function hello(arg) {
    if (isPerson(arg)) {
        console.log(arg.name);
    }
    else {
        console.log(arg.brand);
    }
}
var p = { name: 'hwang', age: 13 };
var c = { brand: 'kia', wheel: 480 };
hello(p); // hwang
hello(c); // kia
