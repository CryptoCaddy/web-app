import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangesPage } from './pages/exchanges/page';

const routes: Routes = [
  { path: '', component: ExchangesPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ExchangesRoutingModule { }
