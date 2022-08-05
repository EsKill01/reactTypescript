
//Interfaces

interface Profie {
    readonly name: string;
    age?: number;
}

let profile: Profie = {
    name: 'Jonh',
    age: 28
}

profile.age = 40;

//Index signature

interface A {
    someProp: string
    [key: string]: number | string;

}

const a: A = {someProp: 'some'};
a.x = 1;
a.y = 2;

//Call signature

interface Sum {
    (a: number, b: number): number;
    prop1: string;
}

const sum: Sum = (a, b) => a + b;
sum.prop1 = "Some";

console.log(sum(2, 3));

//Extending Interfaces

interface Parent {
    x: string;
}

interface Parent2 {
    y: string;
}

interface Parent3 {
    z: string;
}

interface Child extends Parent, Parent2, Parent3 {};

let child: Child = { x: 'some', y: "prorp", z: "Zeta" };
