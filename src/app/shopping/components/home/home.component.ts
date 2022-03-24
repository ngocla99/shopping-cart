import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../../shared/services/home/home.service';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserInfo, UserStore} from "../../../shared/models/user.model";
import {Product} from "../../../shared/models/product";
import {CartService} from "../../../shared/services/cart/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  allProducts: any[] = [];
  ratings: any = [];
  searchStr: string = '';
  quantity: number = 1;
  productItem: any;
  user!: any;
  preLoad = true;

  constructor(private homeService: HomeService, private router: Router, private authService: AuthService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.homeService.getAllProducts().subscribe((data: any) => {
      this.isLoading = false;
      this.allProducts = data.data.result;
      console.log(this.allProducts)
      const ratings = this.allProducts.map((data) => {
        const rating = Math.floor(data.rating);

        return this.createArray(rating);
      });

      this.ratings = ratings;
    });
    this.user = this.authService.getUserInLocalStorage();
  }

  handleDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  createArray(number: number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}
