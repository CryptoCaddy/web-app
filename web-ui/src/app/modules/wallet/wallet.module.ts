import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { WalletBalanceTableComponent } from './components/wallet-balance-table/wallet-balance-table.component';
import { WalletOverviewPage } from './pages/wallet-overview/wallet-overview.page';
import { WalletRoutingModule } from './wallet-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    WalletRoutingModule,
  ],
  declarations: [
    WalletBalanceTableComponent,
    WalletOverviewPage,
  ],
})
export class WalletModule { }
