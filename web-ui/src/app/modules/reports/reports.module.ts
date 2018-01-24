import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/modules/shared/module';

import { ReportsPage } from './pages/reports/reports.page';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
  ],
  declarations: [ ReportsPage ],
})
export class ReportsModule { }
