import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangesSetupPage } from './pages/exchanges-setup/exchanges-setup.page';

const routes: Routes = [
  { path: 'setup', component: ExchangesSetupPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ExchangesRoutingModule { }
