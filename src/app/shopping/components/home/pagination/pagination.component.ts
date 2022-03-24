import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPagesArr: number[] = [];
  @Input() currentPage: number = 0;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {}

  changePage(page: number) {
    this.homeService.pageIndexSub.next(page);

    window.scrollTo(0, 300);
  }
}
