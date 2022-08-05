import multiply, { multiplyByTwo as mBy2, HelloWord  } from "./multiply";
import { ShoppingCart } from "./lib/shopping-cart";
import { calculateTotalAmount } from "./lib/calculate-total-amount";
import { Order } from "./lib/order";
const a = 2;
const b = 5;

console.log(`${a} * ${b} = ${multiply(a, b)}`);
mBy2(3);

const cart = new ShoppingCart();
console.log(`The cart's total is ${calculateTotalAmount(cart)}`);
const order = new Order();
console.log(`The cart's total is ${calculateTotalAmount(order)}`);