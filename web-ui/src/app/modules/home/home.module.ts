import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule, MatIconModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
  ],
})
export class HomeModule { }
