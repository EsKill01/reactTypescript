function genericFunction<T>(X: T): T{
    return X;
}

const genericArrowFunction = <T>(X: T): T =>X;

//Generic Interfaces
interface GenericInterface<T>{
    (a: T): T;
    someProp: T;
}

//Generic class

class GenericClass<P> {
    constructor(public props: P) {}

    getProps(): P{
        return this.props;
    }
}

interface Expirable{
    expirableDate: Date;
    
}

interface ChocolateCake extends Expirable {}
interface VanillaCake extends Expirable {}

const chocolateCakes: ChocolateCake[] = [{expirableDate: new Date()};]
const vanillaCakes: VanillaCake[] = [{expirableDate: new Date()}];

interface GetExpiredItemsFunction {
    <Item extends Expirable>(items: Array<Item>): Array<Item>;
}


const getExpiredItems: GetExpiredItemsFunction = <Item extends Expirable> (items: Array<Item>) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expirableDate.getDate() < currentDate);
}

const expiredChocoCakes = getExpiredItems<ChocolateCake>(chocolateCakes);
const expiredVanillaCakes = getExpiredItems<VanillaCake>(vanillaCakes);