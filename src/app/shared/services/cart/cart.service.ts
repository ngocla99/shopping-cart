import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = 'http://137.184.207.13:5000/v1/orders';
  private myOrder: any = [];
  private cartItemLists: any = [];
  productList = new BehaviorSubject<any>([]);
  private itemInCart: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  getProducts() {
    return this.productList.asObservable();
  }

  creatMyOrder() {
    const cart = this.getCartInLocalStorage();
    const cartObj = JSON.parse(JSON.stringify(cart));
    const itemArr = cartObj.itemArr;
    itemArr.forEach((item: any) => {
      delete item.image;
      delete item.name;
    });
    return this.http.post(this.API_URL, cartObj);
  }

  addToCart(product: any, decrease = false) {
    // this.myOrder.push(product);
    const userId = this.authService.getUserInLocalStorage().id;
    let checkLocalStorge = this.getCartInLocalStorage();
    if (checkLocalStorge) {
      const cart = checkLocalStorge;
      const productsOrder = cart.itemArr;
      let check = false;
      for (let [index, item] of productsOrder.entries()) {
        if (item.productId == product.id) {
          check = true;
          if (!decrease) {
            item.quantity += 1;
            item.total += item.price;
          } else {
            item.quantity -= 1;
            item.total -= item.price;
            if (item.quantity == 0) {
              productsOrder.splice(index, 1);
              console.log(productsOrder);
            }
          }
        }
      }
      if (!check) {
        productsOrder.push({
          name: product.name,
          image: product.images[0].url,
          productId: product.id,
          quantity: 1,
          price: product.price,
          total: product.price,
        });
      }
      this.saveCartToLocalStorage(cart);
    } else {
      const cart = {
        order: {
          paymentMethod: '',
          address: '',
          contact: null,
          totalPrice: product.price,
          userId: userId,
        },
        itemArr: [
          {
            name: product.name,
            image: product.images[0].url,
            productId: product.id,
            quantity: 1,
            price: product.price,
            total: product.price,
          },
        ],
      };
      this.itemInCart.push(cart);
      this.saveCartToLocalStorage(cart);
    }
    this.myOrder = this.getCartInLocalStorage();
    this.cartItemLists = this.myOrder.itemArr;
    this.productList.next(this.myOrder.itemArr);
  }

  deleteCartItem(product: any) {
    this.cartItemLists.map((data: any, index: any) => {
      if (product.productId === data.productId) {
        this.cartItemLists.splice(index, 1);
      }
      this.saveCartToLocalStorage(this.myOrder);
      if (this.cartItemLists.length == 0) {
        this.deleteCartInLocalStorage();
      }
    });
    this.productList.next(this.cartItemLists);
  }

  saveBillInformation(billInfo: any, totalPrice: number) {
    const cart = this.getCartInLocalStorage();

    if (!cart) {
      return;
    }

    const order = cart.order;
    order.address = billInfo.address;
    order.contact = billInfo.contact;
    order.paymentMethod = billInfo.paymentMethod;
    order.totalPrice = totalPrice;

    this.saveCartToLocalStorage(cart);
  }

  getCartInLocalStorage() {
    return JSON.parse(localStorage.getItem('cart') || 'null');
  }

  saveCartToLocalStorage(cart: any) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  deleteCartInLocalStorage() {
    localStorage.removeItem('cart');
  }
}
