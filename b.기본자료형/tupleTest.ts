// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['Hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'Hello']; // Error

x[0] = 'world';
console.log(x.toString()); // OK, 'string' and 'number' both have 'toString'
// x[1] = true; // Error, 'boolean' isn't 'string | number'