import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { UserService } from 'src/app/shared/services/user/user.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  isLoading = false;
  isEditing = false;
  userInfo!: UserInfo;
  imageDefault = this.userService.DEFAULT_IMAGE_URL;

  constructor(
    private userService: UserService,
    private swalAlert: SwalAlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.isLoading = false;
        this.userInfo = user;
      },
      (error) => {
        this.isLoading = false;
        const message = error.error.message;
        this.swalAlert.textAlert('error', message);
      }
    );
  }

  onEdit() {
    this.isEditing = !this.isEditing;
  }

  onChangeUserInfo(info: string, data: string) {
    this.swalAlert.saveChange().then((result) => {
      if (result.isConfirmed) {
        const dataObj: any = {};
        dataObj[info] = data;
        console.log(dataObj);
        this.isLoading = true;
        this.userService.changeInfoUser(info, dataObj).subscribe(
          (user) => {
            this.swalAlert.signAlert('success', `Change ${info} success`);
            this.isLoading = false;
            this.isEditing = false;
            this.userInfo = user;
          },
          (error) => {
            const message = error.error.message;
            this.isLoading = false;
            this.swalAlert.textAlert('error', message);
          }
        );
      } else if (result.isDenied) {
        this.swalAlert.titleAlertTimer(
          'center',
          'info',
          'Changes are not saved'
        );
      }
    });
  }

  onLogout() {
    this.swalAlert.areYouSure().then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.authService.logout().subscribe(
          (data) => {
            this.isLoading = false;
            this.router.navigate(['/auth/sign-in']);
            this.swalAlert.signAlert('success', data.message);
          },
          (error) => {
            this.isLoading = false;
            this.swalAlert.signAlert('error', error.error.message);
          }
        );
      }
    });
  }

  onChangePassword() {
    (async () => {
      const { value: formValues } = await this.swalAlert.popupChangePassword();

      if (formValues) {
        const passwordObj = {
          oldPassword: formValues[0],
          newPassword: formValues[1],
        };

        this.isLoading = true;
        this.userService.changeInfoUser('password', passwordObj).subscribe(
          () => {
            this.isLoading = false;
            this.swalAlert.signAlert('success', 'Change password success');
          },
          (error) => {
            const message = error.error.message;
            this.isLoading = false;
            this.swalAlert.textAlert('error', message);
          }
        );
      }
    })();
  }
}
