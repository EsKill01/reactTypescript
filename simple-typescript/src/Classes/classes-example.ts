class Robot {

    static availableColor = ['green', 'yellow'];

    static isColorAvailable(color: string){
        return Robot.availableColor.includes(color);
    }

    constructor(protected _name: string, color: string){
        
    }

    askName(){
        console.log(`My name is ${this.name}`);
    }

    move(distance: number){
        console.log(`${this.name} moved ${distance} meters`);
    }

    set color(color: string){

        if (!Robot.isColorAvailable(color)){
            throw new Error(`Color ${color} is not available`);
        }

        this._color = color;
    }

    set name(value: string){
        this._name = 'PREFIX_' + value;
    }

    get name() {
        return this._name + 'SUFFIX';
    }


}

class FlyingRobot extends Robot {
    jetpackSize: number;

    constructor(name: string, jetpackSize: number){
        super(name);
        this.jetpackSize = jetpackSize;
    }

    move(distance: number){
        console.log(`${this.name} is flying`);
        super.move(distance);
    }
}

const robot = new Robot('Jonh');
robot.askName();

const flyingRobot = new FlyingRobot('Jim', 2);
flyingRobot.move(10);
//console.log(`Flying robot's jetpack size is`, flyingRobot.jetpackSize);
flyingRobot.name = 'Kevin';
console.log(`My name is ${flyingRobot.name}`);
Robot.availableColor;
