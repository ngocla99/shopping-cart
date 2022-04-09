import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user!: UserInfo;
  isSignedIn = false;
  isAdmin = false;
  @Input() isCart = false;

  totalItems!: number;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private swalAlert: SwalAlertService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user: UserInfo) => {
      this.user = user;
      this.isAdmin = user.role === 'admin';
    });

    this.isSignedIn = this.authService.isSignedIn();

    this.cartService.getProducts().subscribe((data) => {
      this.totalItems = data.length;
    });

    const cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (cart) {
      this.totalItems = cart.itemArr.length;
    }
  }

  onLogout() {
    this.swalAlert.areYouSure().then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(
          (data) => {
            this.router.navigate(['/auth/sign-in']);
            this.swalAlert.signAlert('success', data.message);
          },
          (error) => {
            this.swalAlert.signAlert('error', error.error.message);
          }
        );
      }
    });
  }
}
