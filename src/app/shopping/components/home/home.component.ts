import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductDetail } from 'src/app/shared/models/product.model';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
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
  categoryArray: string[] = [];
  currentPage: number = 1;
  activeCategory: string | null = 'All';

  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private swalAlert: SwalAlertService
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
      this.getData(products);
      // LOG
      console.log(products);
    });
    this.user = this.authService.getUserInLocalStorage();

    this.route.queryParams.subscribe((data) => {
      const category = data.category;
      if (category) this.activeCategory = category;
      else this.activeCategory = 'all';
    });
  }

  getData(products: ProductDetail[]) {
    this.totalPagesArray = this.homeService.getTotalPageArr();
    this.allProducts = products;
    this.currentPage = this.homeService.getCurrentPage();
    this.ratings = this.homeService.getRatingsArr();
    this.unRatings = this.homeService.getUnRatingsArr();
    this.categoryArray = this.homeService.getCategoryArr();
  }

  handleDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCart(product: ProductDetail) {
    this.authService.alertSignIn();
    this.checkProductInStock(product);
    this.cartService.addToCart(product);
  }

  trackByFn(index: number, item: string) {
    return item;
  }

  getProductByCategory(category: string) {
    this.router.navigate(['/home'], {
      queryParams: { category: category },
    });
    this.homeService
      .getAllProducts(1, category)
      .subscribe((products: ProductDetail[]) => {
        this.getData(products);
      });
  }

  checkProductInStock(product: ProductDetail) {
    if (!+product.countInStock) {
      this.swalAlert.titleAlertTimer(
        'center',
        'info',
        `${product.name} is not available now`,
        true
      );

      return;
    }
  }
}
