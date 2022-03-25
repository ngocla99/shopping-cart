import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  categoryArr: any[] = [];
  currentPage = 1;

  pageIndexSub = new Subject<number>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getAllProducts(page: number = 1, category: string = '') {
    if (category) {
      if (category === 'all') return this.getProducts(page);

      return this.getProductsByCategory(page, category);
    } else {
      let categoryParam = this.route.snapshot.queryParamMap.get('category');

      categoryParam = categoryParam !== 'all' ? categoryParam : '';

      if (categoryParam) {
        return this.getProductsByCategory(page, categoryParam);
      } else {
        return this.getProducts(page);
      }
    }
  }

  getProductsByCategory(page: number = 1, category: string) {
    return this.http
      .get<any>(`${this.API_URL}?page=${page}&category=${category}`)
      .pipe(
        tap((data) => {
          this.handleData(data);
        }),
        map((data) => data.data.result)
      );
  }

  getProducts(page: number = 1) {
    return this.http.get<any>(`${this.API_URL}?page=${page}`).pipe(
      tap((data) => {
        this.handleData(data);
      }),
      map((data) => data.data.result)
    );
  }

  private handleData(data: any) {
    this.totalPage = data.data.totalPages;
    this.currentPage = data.data.currentPage;

    const products = data.data.result as ProductDetail[];

    this.ratingsArr = products.map((product) => {
      const rating = Math.floor(+product.rating);
      this.categoryArr.push(product.category);

      return this.createArray(rating);
    });

    this.categoryArr = [...new Set(this.categoryArr)];

    this.unRatingsArr = this.ratingsArr.map((ratingArr) => {
      const length = 5 - ratingArr.length;

      return this.createArray(length);
    });
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPageArr() {
    return this.createArray(this.totalPage);
  }

  getCategoryArr() {
    return [...this.categoryArr];
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
