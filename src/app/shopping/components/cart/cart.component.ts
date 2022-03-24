import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Product} from "../../../shared/models/product";
import {CartService} from "../../../shared/services/cart/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data: any;
  products: any[] = [];
  public sumTotal: number = 0;
  checkEmpty = false;
  totalSum: number = 0;
  checkEmptyCart: boolean = false;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('cart') || 'null');
    this.products = this.data?.itemArr;
    this.checkEmptyCart = this.products?.length === 0;
    this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0)
  }

  onConfirm() {
    Swal.fire({
      title: 'Do you want to confirm payment?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Agree',
          'Payment success',
          'success'
        )
      }
    })
  }

  deleteCartItem(product: Product, index: number) {
    this.products[index].quantity = 0;
    this.cartService.deleteCartItem(product);
    this.checkEmpty = this.products.every(data => data.quantity == 0);
    const data = JSON.parse(localStorage.getItem('cart') || 'null');
    this.checkEmptyCart = data == null;
    // console.log(this.checkEmptyCart)
    if (!this.checkEmptyCart){
    const products = data?.itemArr as any[];
    this.totalSum = products.reduce((acc, curr) => acc + curr.total, 0);
    }
  }

  increase(product: any) {
    product.id = product.productId;
    const productIndex = this.products.findIndex(pro => pro.id === product.id);
    this.products[productIndex].quantity++;
    this.products[productIndex].total += this.products[productIndex].price;
    this.cartService.addToCart(product);
    this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0)
  }

  decrease(product: any) {
    product.id = product.productId;
    const productIndex = this.products.findIndex(pro => pro.id === product.id);
    this.products[productIndex].quantity--;
    this.products[productIndex].total -= this.products[productIndex].price;
    this.cartService.addToCart(product, true);
    this.checkEmpty = this.products.every(data => {
      data.quantity == 0;
    });
    this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0);
    const data = JSON.parse(localStorage.getItem('cart') || 'null');
    this.checkEmptyCart = data.itemArr.length == 0;
    if (this.checkEmptyCart){
      window.localStorage.removeItem('cart');
    }
    if (!this.checkEmptyCart){
      const products = data?.itemArr as any[];
      this.totalSum = products.reduce((acc, curr) => acc + curr.total, 0);
    }
  }
}
