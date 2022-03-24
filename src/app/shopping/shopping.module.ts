import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MenuComponent } from './components/shared/menu/menu.component';
@NgModule({
  declarations: [
    ShoppingComponent,
    CartComponent,
    HomeComponent,
    ProductDetailComponent,
    ListOrdersComponent,
    NavigationComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class ShoppingModule {}
