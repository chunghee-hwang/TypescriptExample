var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function printInfo(target, methodName, paramIndex) {
    console.log({ target, methodName, paramIndex });
}
let Person = class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    hello(message) {
        console.log(message);
    }
};
__decorate([
    __param(0, printInfo)
], Person.prototype, "hello", null);
Person = __decorate([
    __param(1, printInfo)
], Person);
