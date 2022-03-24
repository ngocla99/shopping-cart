import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthComponent, SettingComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
