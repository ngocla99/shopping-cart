import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {
private API_URL = 'http://137.184.207.13:5000/v1/orders/my-orders';
  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get<any>(this.API_URL);
  }
}
