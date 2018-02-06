import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule,
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

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    ExchangesRoutingModule,
    MatAutocompleteModule,
    MatCardModule,
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
})
export class ExchangesModule { }
