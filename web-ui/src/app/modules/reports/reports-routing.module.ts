import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsPage } from './pages/reports/reports.page';

const routes: Routes = [
  { path: '', component: ReportsPage },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ReportsRoutingModule { }
