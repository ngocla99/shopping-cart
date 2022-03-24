import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../../models/product";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = "http://137.184.207.13:5000/v1/orders";
  private myOrder: any = [];
  private cartItemLists: any = [];
  private productList = new BehaviorSubject<any>([]);
  private userID: number = 0;
  private itemInCart: any[] = [];



  constructor(private authService: AuthService) {
  }

  getProducts() {
    return this.productList.asObservable();
  }

  // setProduct(product: any) {
  //   this.myOrder.push(...product);
  //   this.productList.next(product);
  // }

  addToCart(product: any, decrease = false) {
    // this.myOrder.push(product);
    const userId = this.authService.getUserInLocalStorage().id;
    let cart = {
      order: {
        paymentMethod: "",
        address: "",
        contact: null,
        totalPrice: product.price,
        userId: userId
      },
      itemArr: [
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          total: product.price
        }
      ]
    };

    let checkLocalStorge = JSON.parse(localStorage.getItem('cart') || 'null');
    if (checkLocalStorge) {
      const cart = checkLocalStorge;
      const productsOrder = cart.itemArr;
      let check = false;
      for (let [index, item] of productsOrder.entries()) {
        if (item.productId == product.id) {
          check = true;
          if(!decrease){
            item.quantity += 1;
            item.total += item.price;
          }else{
            item.quantity -= 1;
            item.total -= item.price;
            if (item.quantity == 0){
              productsOrder.splice(index, 1);
              console.log(productsOrder)
            }
          }
        }
      }
      if (!check) {
        productsOrder.push(
          {
            productId: product.id,
            name: product.name,
            quantity: 1,
            price: product.price,
            total: product.price
          }
        )
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      this.itemInCart.push(cart);
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    this.myOrder = JSON.parse(localStorage.getItem('cart') || 'null');
    this.cartItemLists = this.myOrder.itemArr;
    this.productList.next(this.myOrder.itemArr);
  }

  deleteCartItem(product: any) {
    this.cartItemLists.map((data: any, index: any) => {
      if (product.productId === data.productId) {
        this.cartItemLists.splice(index, 1);
      }
      window.localStorage.setItem('cart', JSON.stringify(this.myOrder));
      if(this.cartItemLists.length == 0){
        window.localStorage.removeItem('cart');
      }
    })
    this.productList.next(this.cartItemLists);
  }
}
