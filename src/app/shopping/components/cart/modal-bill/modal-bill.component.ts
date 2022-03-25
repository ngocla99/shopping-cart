import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { SwalAlertService } from 'src/app/shared/services/others/swal-alert.service';

@Component({
  selector: 'app-modal-bill',
  templateUrl: './modal-bill.component.html',
  styleUrls: ['./modal-bill.component.css'],
})
export class ModalBillComponent implements OnInit {
  @Output() onHideModal = new EventEmitter<boolean>();
  @Input() totalPrice: number = 0;
  constructor(
    private cartService: CartService,
    private swalAlert: SwalAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hideModal() {
    this.onHideModal.emit(false);
  }

  onSubmit(form: NgForm) {
    const billInfo = form.value;
    this.cartService.saveBillInformation(billInfo, this.totalPrice);
    this.cartService.creatMyOrder().subscribe(
      () => {
        this.swalAlert.titleAlertTimer('center', 'success', 'Order successful');
        form.reset();
        this.onHideModal.emit(false);
        this.cartService.deleteCartInLocalStorage();
        this.router.navigateByUrl('/');
      },
      (error) => {
        const errorMessage = error.error.message;
        this.swalAlert.titleAlertTimer('center', 'error', errorMessage);
      }
    );
  }
}
