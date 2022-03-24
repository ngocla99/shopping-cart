import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SwalAlertService } from '../../services/others/swal-alert.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  isOpen = true;
  isActive = false;
  @Output() onLoading = new EventEmitter<boolean>();
  constructor(
    private authService: AuthService,
    private swalAlert: SwalAlertService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isActive = true;
    }, 3500);
  }

  onSendVerificationEmail() {
    this.onLoading.emit(true);
    this.authService.sendVerificationEmail().subscribe(
      async () => {
        this.onLoading.emit(false);

        const { value: url } = await this.swalAlert.popupVerifyEmail();
        if (url) {
          // FIXME: multiple subscribe
          this.authService.verifyEmail(url);
        }
      },
      (error) => {
        this.onLoading.emit(false);
        const message = error.error.message;
        this.swalAlert.textAlert('error', message);
      }
    );
  }

  onClose() {
    this.isOpen = false;
  }
}
