import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
})
export class PreloaderComponent implements OnInit {
  isLoading = true;
  @Output() loading = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.loading.emit(false);
    }, 1500);
  }
}
