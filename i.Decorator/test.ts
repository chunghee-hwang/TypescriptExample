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