import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLoginPage } from './pages/auth-login/auth-login.page';
import { AuthRegisterPage } from './pages/auth-register/auth-register.page';

export const authRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: AuthLoginPage },
  { path: 'register', component: AuthRegisterPage },
];
