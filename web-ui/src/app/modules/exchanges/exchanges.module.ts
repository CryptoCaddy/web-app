import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
} from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { AddExchangeDialogComponent } from './components/add-exchange-dialog/add-exchange-dialog.component';
import { AddExchangeFormComponent } from './components/add-exchange-form/add-exchange-form.component';
import { ExchangesSetupTableComponent } from './components/exchanges-setup-table/exchanges-setup-table.component';
import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ExchangesSetupPage } from './pages/exchanges-setup/exchanges-setup.page';
import { ExchangesApiService } from './services/exchanges-api.service';
import { SupportedExchangesApiService } from './services/supported-exchanges-api.service';
import { ExchangesProvider } from './storages/exchanges.provider';
import { SupportedExchangesProvider } from './storages/supported-exchanges.provider';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    ExchangesRoutingModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AddExchangeDialogComponent,
    AddExchangeFormComponent,
    ExchangesSetupPage,
    ExchangesSetupTableComponent,
  ],
  entryComponents: [
    AddExchangeDialogComponent,
  ],
  providers: [
    ExchangesApiService,
    ExchangesProvider,
    SupportedExchangesApiService,
    SupportedExchangesProvider,
  ],
})
export class ExchangesModule { }
