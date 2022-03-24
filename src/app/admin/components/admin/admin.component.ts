import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/models/user.model';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLoading = false;
  isEditing = false;
  userInfo!: UserInfo;
  imageDefault = this.userService.DEFAULT_IMAGE_URL;

  constructor(private userService: UserService, private swalAlert: SwalAlertService,) { }

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

}
