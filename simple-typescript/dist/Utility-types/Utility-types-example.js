"use strict";
const updateStarchip = (id, starship) => { };
updateStarchip(1, {
    name: 'Explorer'
});
const starships = {
    Explorer1: {
        name: 'Explorer',
        enableHyperJum: true
    },
    Explorer2: {
        name: 'Explorer2',
        enableHyperJum: false
    }
};
let JonhsDrink = 'Coffee';
let JanesDrink;
let JaneWantToDrink;
function paintStarship(id, color) { }
;
function paintStarshipReturn(id, color) {
    return {
        id,
        color
    };
}
;
paintStarship(1, 'blue');
function Deletable(Base) {
    return class extends Base {
        delete() { }
    };
}
class Car {
    constructor(name) {
        this.name = name;
    }
    ;
}
class User {
    constructor(name) {
        this.name = name;
    }
}
const DeletableCar = Deletable(Car);
const DeletebleUser = Deletable(User);
class Profile {
}
const prof = new Profile();
prof.user = new DeletebleUser('Jon');
prof.user = new DeletableCar('Ferrari');
const myObject = {
    sayHello() {
        return this.helloWord;
    }
};
myObject.sayHello = myObject.sayHello.bind({
    helloWord() {
        return 'Hello world';
    }
});
console.log(myObject.sayHello());
