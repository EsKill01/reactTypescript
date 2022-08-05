class Robot2 {
    #name: string;

    constructor(name: string){
        this.#name = name;
    }

    
    getName() {
        return this.#name; 
    }
}

class AdvanceRobot extends Robot2{
    #name: string;

    constructor(name: string){
        super(name);
        this.#name = `Advanced ${name}`;
    }

    getAdvancedRobotName(){
        return this.#name;
    }

}

const robot2 = new AdvanceRobot('Jack');

console.log('Parent robot name', robot2.getName());
console.log('Subclas robot name', robot2.getAdvancedRobotName());
