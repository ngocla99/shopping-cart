import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductDetail } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private API_URL = 'http://137.184.207.13:5000/v1/products';
  allProducts: ProductDetail[] = [];
  totalPage: number = 0;
  ratingsArr: any[] = [];
  unRatingsArr: any[] = [];
  currentPage = 1;

  pageIndexSub = new Subject<number>();

  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 1) {
    return this.http.get<any>(`${this.API_URL}?page=${page}`).pipe(
      tap((data) => {
        this.totalPage = data.data.totalPages;
        this.currentPage = data.data.currentPage;

        const products = data.data.result as ProductDetail[];

        this.ratingsArr = products.map((product) => {
          const rating = Math.floor(+product.rating);

          return this.createArray(rating);
        });

        this.unRatingsArr = this.ratingsArr.map((ratingArr) => {
          const length = 5 - ratingArr.length;

          return this.createArray(length);
        });
      }),
      map((data) => data.data.result)
    );
  }
  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPageArr() {
    return this.createArray(this.totalPage);
  }

  getRatingsArr() {
    return [...this.ratingsArr];
  }

  getUnRatingsArr() {
    return [...this.unRatingsArr];
  }

  private createArray(number: number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }

  getProductById(id: string | null) {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
