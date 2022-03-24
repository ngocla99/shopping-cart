import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HomeService} from "../../../shared/services/home/home.service";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
product!: Product;
productId: string | null = '';
listImgs: any [] = [];
  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params:ParamMap) => {
        this.productId = params.get('id');
        console.log(this.productId);
      }
    );
    this.homeService.getProductById(this.productId).subscribe((data: any) =>{
      this.product = data.data.product;
      this.listImgs = this.product.images;

      console.log(this.product)
    })
  }
}
