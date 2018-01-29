import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from 'app/modules/shared/module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { AccountPreferencesComponent } from './components/account-preferences/account-preferences.component';
import { AccountOverviewPage } from './pages/account-overview/account-overview.page';
import { AccountService } from './services/account.service';

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AccountOverviewPage,
    AccountDataComponent,
    AccountPreferencesComponent,
  ],
  providers: [
    AccountService,
  ],
})
export class AccountModule { }
