import { ShoppingCartItem } from "./shoppping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    // items - object, not array
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get productIds() {
        return Object.keys(this.items);
    }

     // count # of certain items in the current shopping cart
    getQuantity(product: Product) {
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
} 