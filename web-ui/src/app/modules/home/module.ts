import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/modules/shared/module';

import { HomePage } from './pages/home/page';
import { HomeRoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
  ],
})
export class HomeModule { }
