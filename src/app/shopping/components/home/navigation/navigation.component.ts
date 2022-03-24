import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CartService } from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  user!: UserInfo;
  isSignedIn = false;
  isAdmin = false;
  totalItems!: number;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private swalAlert: SwalAlertService,
    private router: Router,
    private cartService: CartService
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
