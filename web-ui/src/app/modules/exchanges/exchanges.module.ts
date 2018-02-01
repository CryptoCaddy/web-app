import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { ExchangeConfigurationItemComponent } from './components/exchange-configuration-item/exchange-configuration-item.component';
import { ExchangesConfigurationListComponent } from './components/exchange-configuration-list/exchange-configuration-list.component';
import { ExchangeWalletListComponent } from './components/exchange-wallet-list/exchange-wallet-list.component';
import { ExchangeWalletTableComponent } from './components/exchange-wallet-table/exchange-wallet-table.component';
import { ExchangeWalletComponent } from './components/exchange-wallet/exchange-wallet.component';
import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ExchangesPage } from './pages/exchanges/exchanges.page';
import { ExchangesApiService } from './services/exchanges-api.service';
import { ExchangeWalletsProvider } from './storages/exchange-wallets.provider';
import { ExchangesProvider } from './storages/exchanges.provider';
import { SupportedExchangesProvider } from './storages/supported-exchanges.provider';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    ExchangesRoutingModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    ExchangeConfigurationItemComponent,
    ExchangesConfigurationListComponent,
    ExchangesPage,
    ExchangeWalletComponent,
    ExchangeWalletListComponent,
    ExchangeWalletTableComponent,
  ],
  providers: [
    SupportedExchangesProvider,
    ExchangesApiService,
    ExchangesProvider,
    ExchangeWalletsProvider,
  ],
})
export class ExchangesModule { }
