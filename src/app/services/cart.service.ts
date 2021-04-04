import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){
    let item = CartItems.find(c=> c.car.id===car.id);
    if (item) {
      return;
    }else{
      let cartItem =  new CartItem();
      cartItem.car = car;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=> c.car.id===car.id);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }
}
