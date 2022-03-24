import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    UserComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AdminModule {}
