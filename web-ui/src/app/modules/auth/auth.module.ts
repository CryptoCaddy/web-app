import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    LoginPage,
  ],
})
export class AuthModule { }
