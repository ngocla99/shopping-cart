import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private swalAlert: SwalAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignUp(form: NgForm) {
    const user = form.value;
    this.isLoading = true;

    this.authService.signUp(user).subscribe(
      () => {
        form.reset();
        this.isLoading = false;

        this.swalAlert.titleAlertTimer(
          'center',
          'success',
          'Please sign in again'
        );
        this.router.navigate(['/auth/sign-in']);
      },
      (error) => {
        this.isLoading = false;
        const errorMessage = error.error.message;
        this.swalAlert.signAlert('error', errorMessage);
      }
    );
  }

  onToShopping() {
    this.router.navigate(['/']);
  }
}
