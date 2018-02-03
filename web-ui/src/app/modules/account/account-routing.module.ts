import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/modules/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/modules/auth/guards/no-auth.guard';

import { AccountLoginPage } from './pages/account-login/account-login.page';
import { AccountOverviewPage } from './pages/account-overview/account-overview.page';
import { AccountRegisterPage } from './pages/account-register/account-register.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'login', canActivate: [ NoAuthGuard ], component: AccountLoginPage },
  { path: 'register', canActivate: [ NoAuthGuard ], component: AccountRegisterPage },
  { path: 'overview', canActivate: [ AuthGuard ], component: AccountOverviewPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
