import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { ExchangeWalletFormComponent } from './components/exchange-wallet-form/exchange-wallet-form.component';
import { ExchangeWalletTableComponent } from './components/exchange-wallet-table/exchange-wallet-table.component';
import { ExchangeWalletComponent } from './components/exchange-wallet/exchange-wallet.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    DemoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    ExchangeWalletComponent,
    ExchangeWalletFormComponent,
    ExchangeWalletTableComponent,
  ],
})
export class DemoModule { }
