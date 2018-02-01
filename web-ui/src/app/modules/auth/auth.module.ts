import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AccountModule } from 'app/modules/account/account.module';
import { SharedModule } from 'app/modules/shared/shared.module';

import { AuthLoginFormComponent } from './components/auth-login-form/auth-login-form.component';
import { AuthRegisterFormComponent } from './components/auth-register-form/auth-register-form.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { AuthLoginPage } from './pages/auth-login/auth-login.page';
import { AuthRegisterPage } from './pages/auth-register/auth-register.page';
import { AuthService } from './services/auth.service';


@NgModule({
  imports: [
    AccountModule,
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    AuthLoginFormComponent,
    AuthLoginPage,
    AuthRegisterFormComponent,
    AuthRegisterPage,
  ],
  providers: [
    AuthGuard,
    AuthService,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule { }
