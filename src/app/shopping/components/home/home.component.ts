import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductDetail } from 'src/app/shared/models/product.model';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { HomeService } from '../../../shared/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: ProductDetail[] = [];
  ratings: any[] = [];
  unRatings: any[] = [];
  searchStr: string = '';
  quantity: number = 1;
  productItem: any;
  user!: any;
  preLoad = true;
  totalPagesArray: number[] = [];
  currentPage: number = 1;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initHome();
    this.homeService.pageIndexSub
      .pipe(switchMap((page) => this.homeService.getAllProducts(page)))
      .subscribe((products: ProductDetail[]) => {
        this.getData(products);
      });
  }

  initHome() {
    this.homeService.getAllProducts().subscribe((products: ProductDetail[]) => {
      this.totalPagesArray = this.homeService.getTotalPageArr();

      this.getData(products);
    });
    this.user = this.authService.getUserInLocalStorage();
  }

  getData(products: ProductDetail[]) {
    this.allProducts = products;
    console.log(products);
    this.currentPage = this.homeService.getCurrentPage();
    this.ratings = this.homeService.getRatingsArr();
    this.unRatings = this.homeService.getUnRatingsArr();
  }

  handleDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
