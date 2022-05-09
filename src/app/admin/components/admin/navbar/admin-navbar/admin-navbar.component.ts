import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/models/user.model';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  userInfo!: UserInfo;
  constructor(
    private userService: UserService,
    private swalAlert: SwalAlertService
  ) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.userInfo = user;
        console.log(this.userInfo);
      },
      (error) => {
        const message = error.error.message;
        this.swalAlert.textAlert('error', message);
      }
    );
  }
}
