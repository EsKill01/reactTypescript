// Functions (optional and default parameters)

function sum(a: number, b : number = 0, c?: number) : number {
    return a + b;
}

type MyFunc = (a: number, b: number) => number;
const sum2: MyFunc = (a, b) => a + b;

//Unknow number of arguments

function sumEverting(arg1: string, arg2: boolean, ...numbers: number[]) : number{
    return numbers.reduce((result, num) => result + num, 0);
}

//Overloads

function calcArea(width: number, heigth: number):number;
function calcArea(length: number): number;
function calcArea(...args: number[]): number{
    if (args.length === 2){
        return args[0] * args[1];
    }
    return Math.pow(args[0], 2);
}



