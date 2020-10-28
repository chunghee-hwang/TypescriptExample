const sayHi = (name: string, age: number, gender: string):string => {
    return `Hello ${name}, your are ${age}, you are a ${gender}!`;
};

console.log(sayHi('Hwang', 27, 'Male'));

export {};