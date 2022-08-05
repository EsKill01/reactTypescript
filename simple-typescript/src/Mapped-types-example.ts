type Properties = 'propA' | 'propB';

type MyMappedType = {
    [P in Properties]: boolean;
}

type MyMappedType2<Properties extends string | number | symbol> = {
    [P in Properties]: P;
}

type MyMappedType3<T> = {
    [P in keyof T]: T[P] | null;
}

type MyNewType = MyMappedType3<{a: 'a'; b: 'b'}>;

type Pick1<T, Properties extends keyof T> = {
    [P in Properties]: T[P];
}

type MyNewType2 = Pick<{a: 'a'; b: 'b'}, 'a' | 'b'>;

type Record1<K extends keyof any, T> = {
    [P in K]: T;
}

interface Record2 {
    [key: 
        
        
        number] : number;
}

const someRecord: Record1<string, number> = {}
someRecord.apples = 20;
someRecord.oranges = 20;