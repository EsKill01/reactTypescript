interface IAnimal {
    name: string;
    group: string | undefined;
    setGroup(group: string): void;
}

interface IAnimalConstructor<T> {
    new (name: string): T;
}

class Cat implements IAnimal{
    name: string;
    group: string | undefined;
    setGroup(group: string): void{
        this.group = group;
    };
    constructor(name: string){
        this.name = name;
    }
}

class Dog implements IAnimal{
    name: string;
    group: string | undefined;
    setGroup(group: string): void{
        this.group = group;
    };
    constructor(name: string){
        this.name = name;
    }
    bark(){}
}

function initializeAnimal<T extends IAnimal>(Animal: IAnimalConstructor<T>, name: string){
    const animal = new Animal(name);
    animal.setGroup('Mammals');
    return animal;
}

const cat = initializeAnimal(Cat, 'Felix');
const dog = initializeAnimal(Dog, 'Duke');
dog.bark();