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
  MatStepperModule,
} from '@angular/material';
import { SharedModule } from 'app/modules/shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { AccountLoginFormComponent } from './components/account-login-form/account-login-form.component';
import { AccountPreferencesFormComponent } from './components/account-preferences-form/account-preferences-form.component';
import { AccountRegisterFormComponent } from './components/account-register-form/account-register-form.component';
import { AccountLoginPage } from './pages/account-login/account-login.page';
import { AccountOverviewPage } from './pages/account-overview/account-overview.page';
import { AccountRegisterPage } from './pages/account-register/account-register.page';
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
    MatStepperModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AccountDataComponent,
    AccountOverviewPage,
    AccountLoginFormComponent,
    AccountLoginPage,
    AccountPreferencesFormComponent,
    AccountRegisterFormComponent,
    AccountRegisterPage,
  ],
  providers: [
    AccountApiService,
    AccountProvider,
  ],
})
export class AccountModule { }
