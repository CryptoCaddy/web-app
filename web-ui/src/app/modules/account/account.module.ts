import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { AccountPreferencesFormComponent } from './components/account-preferences-form/account-preferences-form.component';
import { AccountOverviewPage } from './pages/account-overview/account-overview.page';
import { AccountApiService } from './services/account-api.service';
import { AccountProvider } from './storage/account.provider';

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AccountOverviewPage,
    AccountDataComponent,
    AccountPreferencesFormComponent,
  ],
  providers: [
    AccountApiService,
    AccountProvider,
  ],
  exports: [
    AccountPreferencesFormComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AccountModule { }
