interface IA {
    a: number;
}

interface IB {
    b: number;
}

interface IC {
    c: number;
}

function X(obj: IA & IB){
    return  obj.a + obj.b;
}

function combine<objA extends object, objB extends object(obja: objA, objb: objB){
    return {... obja, ...objb};
}

const objA =  {a: 1};
const objB = {b:2};
const resultObj = combine(objA,objB );