"use strict";
function X(obj) {
    return obj.a + obj.b;
}
function combine(obja, objb) {
    return Object.assign(Object.assign({}, obja), objb);
}
const objA = { a: 1 };
const objB = { b: 2 };
const resultObj = combine(objA, objB);
