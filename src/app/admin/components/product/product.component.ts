import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProductService } from 'src/app/shared/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  p: number = 1;
  isLoading = false;
  public products: any;
  public product: any;
  public unsubscribe = new Subject();
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  submitted = false;
  keywords: any;
  urlForm!: FormGroup;
  public totalItems!: number;

  allProducts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.formsearch = this.fb.group({
      keywords: [''],
    });
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.isLoading = false;
      this.allProducts = res?.data?.result;
      this.totalItems = res?.data?.total;
      console.log(this.allProducts);
    });
  }

  searchProduct() {
    this.productService
      .searchProduct(this.formsearch.get('keywords').value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.keywords = res.data;
        this.allProducts = res.data.products.result;
      });
  }
  search(event: any) {
    this.productService
      .searchProduct(this.formsearch.get('keywords').value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.keywords = res.data;
        this.allProducts = res.data.products.result;
        console.log(event.target.value);
      });
  }

  onSubmit(value: any) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      let tmp = {
        name: value.name,
        brand: value.brand,
        category: value.category,
        description: value.description,
        price: value.price,
        rating: value.rating,
        countInStock: value.countInStock,
        imageUrls: [value.imageUrls],
      };
      this.productService
        .createProduct(tmp)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (res) => {
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
              title: 'Create Product success!!!',
            });
            this.closeModal();
            this.getAllProducts();
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
              title: 'Create fail!!!',
            });
          }
        );
    } else {
      let tmp = {
        name: value.name,
        brand: value.brand,
        category: value.category,
        description: value.description,
        price: value.price,
        rating: value.rating,
        countInStock: value.countInStock,
      };
      this.productService
        .updateProductById(tmp, this.product.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (res) => {
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
              title: 'Update Product success!!!',
            });
            this.closeModal();
            this.getAllProducts();
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
            this.getAllProducts();
          }
        );
    }
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.product = null;
    setTimeout(() => {
      (<any>$('#createUserModal')).modal('toggle');
      this.formdata = this.fb.group(
        {
          name: ['', Validators.required],
          brand: ['', Validators.required],
          category: ['', Validators.required],
          description: ['', Validators.required],
          price: ['', Validators.required],
          rating: ['', Validators.required],
          countInStock: ['', Validators.required],
          imageUrls: [''],
        },
        {}
      );

      this.doneSetupForm = true;
    });
  }

  onDelete(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(row.id).subscribe(
          () => {
            this.getAllProducts();
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#273043',
        });
      }
    });
  }

  openUpdateModal(id: any) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.productService
      .getProductById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          let response: any = res;
          this.product = response.data.product;
          console.log(this.product);
          setTimeout(() => {
            (<any>$('#createUserModal')).modal('toggle');
            this.formdata = this.fb.group(
              {
                name: [this.product.name, Validators.required],
                brand: [this.product.brand, Validators.required],
                category: [this.product.category, Validators.required],
                description: [this.product.description, Validators.required],
                price: [this.product.price, Validators.required],
                rating: [this.product.rating, Validators.required],
                countInStock: [this.product.countInStock, Validators.required],
                imageUrls: [this.product.imageUrls],
              },
              {}
            );
            this.doneSetupForm = true;
          });
          700;
        },
        (err) => {
          console.error(err.error);
        }
      );
  }

  get f() {
    return this.formdata.controls;
  }

  Reset() {
    this.product = null;
    this.formdata = this.fb.group(
      {
        name: ['', Validators.required],
        brand: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        rating: ['', Validators.required],
        countInStock: ['', Validators.required],
        imageUrls: ['', Validators.required],
      },
      {}
    );
  }

  closeModal() {
    (<any>$('#createUserModal').closest('.modal')).modal('hide');
  }
}
