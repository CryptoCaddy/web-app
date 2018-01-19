import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/modules/shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
  ],
  declarations: [ ReportsComponent ],
})
export class ReportsModule { }
