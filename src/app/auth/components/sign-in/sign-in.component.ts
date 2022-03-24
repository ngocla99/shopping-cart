import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSignIn } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private swalAlert: SwalAlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignIn(form: NgForm) {
    const user = form.value;
    this.isLoading = true;

    this.authService.signIn(user).subscribe(
      () => {
        form.reset();
        this.isLoading = false;
        this.swalAlert.signAlert('success', 'Login successful');

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      (error) => {
        form.reset();
        this.isLoading = false;
        const errorMessage = error.error.message;
        this.swalAlert.signAlert('error', errorMessage);
      }
    );
  }

  onToShopping() {
    this.router.navigate(['/']);
  }

  onForgotPassword() {
    (async () => {
      const { value: email } = await this.swalAlert.popupForgotPassword();

      if (email) {
        this.isLoading = true;
        this.authService.forgotPassword({ email }).subscribe(
          () => {
            this.isLoading = false;
            this.swalAlert.textAlert(
              'success',
              `We have sent a new password to your email ${email}`,
              'Sign in again'
            );
          },
          (error) => {
            this.isLoading = false;
            const message = error.error.message;
            this.swalAlert.textAlert('error', message);
          }
        );
      }
    })();
  }
}
