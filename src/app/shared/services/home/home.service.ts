import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product";
import {map, share, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private API_URL = "http://137.184.207.13:5000/v1/products";
  allProducts: Product[] = [];

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.API_URL);
    // console.log(this.allProducts)
    // return of<Product[]>(this.allProducts)
  }

  get products$(){
    this.getAllProducts().subscribe((data:any) => this.allProducts = data.data.result)
    console.log(this.allProducts)
    return of(this.allProducts).pipe(shareReplay(1))
  }

  getProductById(id: string | null){
    return this.http.get(`${this.API_URL}/${id}`);
  }


}
