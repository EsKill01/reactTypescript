"use strict";
class Cat {
    constructor(name) {
        this.name = name;
    }
    setGroup(group) {
        this.group = group;
    }
    ;
}
class Dog {
    constructor(name) {
        this.name = name;
    }
    setGroup(group) {
        this.group = group;
    }
    ;
    bark() { }
}
function initializeAnimal(Animal, name) {
    const animal = new Animal(name);
    animal.setGroup('Mammals');
    return animal;
}
const cat = initializeAnimal(Cat, 'Felix');
const dog = initializeAnimal(Dog, 'Duke');
dog.bark();
