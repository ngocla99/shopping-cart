import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css'],
})
export class ModalOrderComponent implements OnInit {
  @Input() order!: any;
  @Output() onHideModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  hideModal() {
    this.onHideModal.emit(false);
  }
}
