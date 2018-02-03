import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/modules/shared/shared.module';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { AuthService } from './services/auth.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
