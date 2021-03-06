import { Component, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/shared/models/product.model';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  showModal: boolean = false;
  data: any;
  products: any[] = [];
  public sumTotal: number = 0;
  checkEmpty = false;
  totalSum: number = 0;
  checkEmptyCart: boolean = false;

  constructor(
    private cartService: CartService,
    private swalAlert: SwalAlertService
  ) {}

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('cart') || 'null');
    this.products = this.data?.itemArr;

    if (this.products) {
      this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0);
    } else {
      this.checkEmptyCart = true;
    }
  }

  onConfirm() {
    this.showModal = true;
  }

  deleteCartItem(product: ProductDetail, index: number) {
    this.swalAlert.deleteCartItem().then((result) => {
      if (result.isConfirmed) {
        this.swalAlert.titleAlertTimer('center', 'success', 'Remove success');
        this.products[index].quantity = 0;
        this.cartService.deleteCartItem(product);
        this.checkEmpty = this.products.every((data) => data.quantity == 0);
        const data = JSON.parse(localStorage.getItem('cart') || 'null');
        this.checkEmptyCart = data == null;
        if (!this.checkEmptyCart) {
          const products = data?.itemArr as any[];
          this.totalSum = products.reduce((acc, curr) => acc + curr.total, 0);
        }
      } else {
        return;
      }
    });
  }

  increase(product: any) {
    product.id = product.productId;
    const productIndex = this.products.findIndex(
      (pro) => pro.id === product.id
    );
    this.products[productIndex].quantity++;
    this.products[productIndex].total += this.products[productIndex].price;
    this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0);
    this.cartService.addToCart(product);
  }

  decrease(product: any) {
    product.id = product.productId;
    const productIndex = this.products.findIndex(
      (pro) => pro.id === product.id
    );
    if (this.products[productIndex].quantity === 1) {
      this.swalAlert.deleteCartItem().then((result) => {
        if (result.isConfirmed) {
          this.swalAlert.titleAlertTimer('center', 'success', 'Remove success');
          this.handleDecreaseItem(product, productIndex);
        } else {
          return;
        }
      });
    } else {
      console.log(2);
      this.handleDecreaseItem(product, productIndex);
    }
  }

  private handleDecreaseItem(product: any, index: number) {
    this.products[index].quantity--;
    this.products[index].total -= this.products[index].price;
    this.cartService.addToCart(product, true);
    this.checkEmpty = this.products.every((data) => {
      data.quantity == 0;
    });
    this.totalSum = this.products.reduce((acc, curr) => acc + curr.total, 0);
    const data = JSON.parse(localStorage.getItem('cart') || 'null');
    this.checkEmptyCart = data.itemArr.length === 0;
    if (this.checkEmptyCart) {
      window.localStorage.removeItem('cart');
    }
    if (!this.checkEmptyCart) {
      const products = data?.itemArr as any[];
      this.totalSum = products.reduce((acc, curr) => acc + curr.total, 0);
    }
  }
}
