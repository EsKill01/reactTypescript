type SomeType = number;
type MyConditionalType = SomeType extends string ? string : null;

function someFunction<T>(value: T){
    type A = T extends boolean
    ? 'TYPE A'
    : T extends string
    ? 'TYPE B'
    : T extends Number
    ? 'TYPE C'
    : 'TYPE D';
    const someOtherFunctuion = (
        someArg: T extends boolean ? 'TYPE A' : 'TYPE B'
    ) => { const a: 'TYPE A ' | 'TYPE B' = someArg;};
    return someOtherFunctuion;
}

const result = someFunction(true);
type StringOrNot<T> = T extends string ? string : never;

type AUnion = string | boolean | never;

type ResultType = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

type MyType<T> = (()=>T) extends string | number ? T : never;
type MyResult = MyType<string | number | boolean>;

type InterSomething2<T> = T extends {a: infer A; b: infer B} ? A & B : any;
type Interred2 = InterSomething2<{
    a: {someAProp : 1};
    b: {someBProp: 'B'}
}>;

type MyFunctReturnValue = ReturnType<() => true>;

