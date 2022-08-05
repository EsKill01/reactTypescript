////
interface Cart {
    calculateTotal(): number;
}

/////
interface Cart {
    x: number;
}

interface Cart {
    calculateTotal(options: {discountCode: number}): number;
}

let myCart: Cart = {
    x: 1,
    calculateTotal(options?: {discountCode: number}){
        if(options && options.discountCode){
            return 0;
        }
        return 1;
    }
}

///
namespace MyNamespace {
    export const x: number = 10;
    export interface SomeInterface {
        y: number;
    }
}

namespace MyNamespace {
    export const getx = () => x;
    export interface SomeInterface {
        x: number;
    }
}

MyNamespace.x;
MyNamespace.getx();

const SomeInterface: MyNamespace.SomeInterface = {
    x: 1,
    y: 2
};

///
function someFunction() {
    return 10;
}

namespace someFunction {
    export const someProperty = 10;
}

someFunction.someProperty;

///

enum Vegetables {
    Tomato = 'tomato',
    Onion = 'onion'
}

namespace Vegetables {
    export function makeSalad() {
        return Vegetables.Tomato + Vegetables.Onion;
    }
}

const salada = Vegetables.makeSalad();

///

class Salad {}

namespace Salad {
    export const availableDressings = ['olive oil', 'yoghurt'];
}

Salad.availableDressings.includes('olive oil');