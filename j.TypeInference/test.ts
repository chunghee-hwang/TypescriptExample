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