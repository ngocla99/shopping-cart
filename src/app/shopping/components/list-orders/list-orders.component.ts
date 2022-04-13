import { Component, OnInit } from '@angular/core';
import { OrderDetail, OrdersData } from 'src/app/shared/models/order.model';
import { UserInfo } from 'src/app/shared/models/user.model';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  p: number = 1;
  isLoading: boolean = false;
  showModal: boolean = false;
  user!: UserInfo;
  index: number = 0;
  totalOrder: number = 0;
  myOrders: OrderDetail[] = [];
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private swalAlert: SwalAlertService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe((user: UserInfo) => {
      this.user = user;
    });

    this.productService.getMyOrder().subscribe((orders: OrdersData) => {
      this.isLoading = false;
      this.totalOrder = orders.total;
      this.myOrders = orders.result;
    });
  }

  onShowModal(index: number) {
    this.showModal = true;
    this.index = index;
  }

  popupDevelop() {
    this.swalAlert.titleAlertTimer(
      'center',
      'info',
      'This feature is in developement',
      true
    );
  }
}
