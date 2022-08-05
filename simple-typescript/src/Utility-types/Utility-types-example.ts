//Partial
 interface Starship {
     name: string,
     enableHyperJum: boolean
 }
 //

 type StarshipNameOnly = Pick<Starship, 'name'>;
 type StarshipWithoutName = Omit<Starship, 'name'>;

 const updateStarchip = (id: number, starship: Partial<Starship>) => {};

 updateStarchip(1, {
     name: 'Explorer'
 });


 const starships: Record<string, Starship> = {
     Explorer1:{
         name: 'Explorer',
         enableHyperJum: true
     },
     Explorer2:{
         name: 'Explorer2',
         enableHyperJum: false
     }
 };

 type AvailableDrinks = 'Coffee' | 'Tea' | 'Orange Juice' | 'Lemonate';


 let JonhsDrink = 'Coffee';

 type DrinksJaneDosentLike = 'Coffee' | 'Orange Juice';
 type DrinksJaneLikes = 'Tea' | 'Lemonade' | 'Mohito';

 let JanesDrink: Exclude<AvailableDrinks, DrinksJaneDosentLike>;
 let JaneWantToDrink: Extract<AvailableDrinks, DrinksJaneLikes>;

 interface StarshipProperties {
     color?: 'blue' | 'red' | 'green';
 }

 function paintStarship(id: number, color: NonNullable<StarshipProperties['color']>){};
 function paintStarshipReturn(id: number, color: NonNullable<StarshipProperties['color']>){
     return{
         id, 
         color
     }
 };

 type PaintStarshipReturn = ReturnType<typeof paintStarshipReturn>;

 

 paintStarship(1, 'blue');

 //InstanceType

 type Constructable<ClassInstance> = new (...args: any[]) => ClassInstance;

 function Deletable<BaseClass extends Constructable<{}>>(Base: BaseClass){
     return class extends Base {
         deleted: boolean;
         delete() {}
     }
 }

 class Car {

     constructor(public name: string){};

 }

 class User {
     constructor(public name: string) {}
 }

 const DeletableCar = Deletable(Car);
 const DeletebleUser = Deletable(User);

 type DeletableUserInstance = InstanceType<typeof DeletebleUser>;
  type DeletableCarInstance = InstanceType<typeof DeletableCar>;

 class Profile {
     user: DeletableUserInstance;
     car: DeletableCarInstance;
 }

 const prof = new Profile();
 prof.user = new DeletebleUser('Jon');
 prof.user = new DeletableCar('Ferrari');
 
 ///

 ///This type<T>
 interface MyObject {
     sayHello(): void;
 }

 interface MyObjectThis {
     helloWord(): string;
 }

 const myObject: MyObject & ThisType<MyObjectThis> = {
     sayHello(){
         return this.helloWord;
     }
 }

 myObject.sayHello = myObject.sayHello.bind({
     helloWord() {
         return 'Hello world';
     }
 });

 console.log(myObject.sayHello());

