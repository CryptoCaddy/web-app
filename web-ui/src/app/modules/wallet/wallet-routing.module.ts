import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletOverviewPage } from './pages/wallet-overview/wallet-overview.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', component: WalletOverviewPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WalletRoutingModule { }
