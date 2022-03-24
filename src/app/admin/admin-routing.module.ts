import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../shared/guards/admin-auth.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      {path: '', redirectTo: 'product', pathMatch: 'full'},
      {path: 'product', component: ProductComponent},
      {path: 'user', component: UserComponent},
      {path: 'order', component: OrderComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
