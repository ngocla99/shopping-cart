import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SignedInAuthGuard } from '../shared/guards/signed-in-auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { SettingComponent } from './components/setting/setting.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [SignedInAuthGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [SignedInAuthGuard],
      },
      {
        path: 'my-profile',
        component: SettingComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
