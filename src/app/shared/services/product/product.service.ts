import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { OrderUpdate } from '../../models/order.model';
import { ProductCreate, ProductUpdate } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://137.184.207.13:5000/v1';

  constructor(private http: HttpClient) {}

  //Order API
  getOrderByAdmin() {
    return this.http.get<any>(this.API_URL + '/orders');
  }

  getOrderByID(id: number) {
    return this.http.get<any>(this.API_URL + `/orders/${id}`);
  }

  updateOrder(update: OrderUpdate, id: number) {
    return this.http.patch<any>(this.API_URL + `/orders/${id}`, update);
  }

  getMyOrder() {
    return this.http
      .get<any>(this.API_URL + '/orders/my-orders')
      .pipe(map((data) => data.data.orders));
  }

  //Product API
  getAllProducts() {
    return this.http.get<any>(`${this.API_URL}/products`);
  }

  createProduct(product: ProductCreate) {
    return this.http.post<any>(this.API_URL + '/products', product);
  }

  getProductById(id: number) {
    return this.http.get(this.API_URL + `/products/${id}`);
  }

  updateProductById(product: ProductUpdate, id: number) {
    return this.http.patch<any>(this.API_URL + `/products/${id}`, product);
  }

  searchProduct(keywords: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/search?keyword=${keywords}`);
  }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/${id}`);
  }
}
