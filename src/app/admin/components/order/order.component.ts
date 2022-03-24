import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { productDetail } from 'src/app/shared/models/product.model';
import { UserInfo } from 'src/app/shared/models/user.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  p: number = 1;
  isLoading = false;
  public order: any;
  public unsubscribe = new Subject();
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  public customerInfor!:UserInfo;
  public product!: productDetail;
  submitted = false;
  orders: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getallOrder();
  }

  getallOrder() {
    this.productService.getOrderByAdmin().subscribe(data => {
      this.isLoading = false;
      this.orders = data.data.orders.result;
      console.log(this.orders);
    }
      , err => console.log(err)
    )
  }

  onSubmit(value: any) {
    this.submitted = true;
      let tmp = {
        status: value.status,
        isPaid: value.isPaid
      };
      this.productService.updateOrder(tmp, this.order.id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Update Order success!!!',
          
        });
        this.closeModal();
        this.getallOrder();
      },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Update fail!!!',
        });
        this.closeModal();
        this.getallOrder();
      },)
      
  }

  get f() {
    return this.formdata.controls;
  }

  openUpdateModal(id: any) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.productService.getOrderByID(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      let response: any = res;
      this.order = response.data.order;
      
      console.log(this.order);
      this.userService.getUserById(this.order?.userId).subscribe(res => {
        this.customerInfor = res?.data
      })

      // this.productService
      // .getProductById(id)
      // .subscribe(
      //   (res) => {
      //     let response: any = res;
      //     this.product = response.data.product;
      //     console.log(this.product);
      //   })
      setTimeout(() => {
        (<any>$('#createOrderModal')).modal('toggle');
        this.formdata = this.fb.group({
          'userId': [this.order.userId, Validators.required],
          'address': [this.order.address, Validators.required],
          'contact': [this.order.contact, Validators.required],
          'paymentMethod': [this.order.paymentMethod, Validators.required],
          'totalPrice': ['$' + this.order.totalPrice, Validators.required],
          'isPaid': [this.order.isPaid, Validators.required],
          'paidAt': [this.order.paidAt, Validators.required],
          'status': [this.order.status, Validators.required],
        }, {
        });
        this.doneSetupForm = true;
      });
      700;
    }, err => {
      console.error(err.error);
    })
  }
  closeModal() {
    (<any>$('#createOrderModal').closest('.modal')).modal('hide');
  }
}
