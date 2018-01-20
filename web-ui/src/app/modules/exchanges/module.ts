import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/module';

import { ExchangeConfigurationItemComponent } from './components/configuration/item/component';
import { ExchangesConfigurationListComponent } from './components/configuration/list/component';
import { ExchangeWalletComponent } from './components/wallet/component';
import { ExchangeWalletListComponent } from './components/wallet/list/component';
import { ExchangeWalletTableComponent } from './components/wallet/table/component';
import { ExchangesPage } from './pages/exchanges/page';
import { ExchangesRoutingModule } from './routing.module';
import { ExchangesApiService } from './services/exchanges-api/service';
import { AvailableExchangesProvider } from './storage/available-exchanges/provider';
import { ExchangeWalletsProvider } from './storage/exchange-wallets/provider';
import { ExchangesProvider } from './storage/exchanges/provider';

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
    AvailableExchangesProvider,
    ExchangesApiService,
    ExchangesProvider,
    ExchangeWalletsProvider,
  ],
})
export class ExchangesModule { }
