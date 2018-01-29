import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountOverviewPage } from './pages/account-overview/account-overview.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', component: AccountOverviewPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
