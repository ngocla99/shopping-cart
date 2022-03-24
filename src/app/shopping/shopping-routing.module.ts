import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './components/shopping/shopping.component';
import {HomeComponent} from "./components/home/home.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";
import {ListOrdersComponent} from "./components/list-orders/list-orders.component";

const routes: Routes = [
  { path: '', component: ShoppingComponent, children: [
      {
        path: '',
        redirectTo: "home",
        pathMatch: 'full'
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "products/:id",
        component: ProductDetailComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "list-orders",
        component: ListOrdersComponent
      }

    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
