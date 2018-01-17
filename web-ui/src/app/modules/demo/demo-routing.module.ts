import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangeWalletComponent } from './components/exchange-wallet/exchange-wallet.component';

const routes: Routes = [
  { path: 'exchange-wallet', component: ExchangeWalletComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DemoRoutingModule { }
