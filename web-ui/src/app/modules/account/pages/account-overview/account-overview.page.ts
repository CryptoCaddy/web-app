import { Component, OnInit, ViewChild } from '@angular/core';

import { AccountPreferencesFormComponent } from '../../components/account-preferences-form/account-preferences-form.component';
import { MatSnackBar } from '@angular/material';
import { AuthUser } from '../../../auth/models/auth-user.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'cdy-account-overview-page',
  templateUrl: './account-overview.page.html',
  styleUrls: [ './account-overview.page.scss' ],
})
export class AccountOverviewPage implements OnInit {

  @ViewChild('accountPreferences')
  public accountPreferences: AccountPreferencesFormComponent;

  public user$: Observable<AuthUser>;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
    this.accountPreferences.completed$.subscribe((state: boolean) => {
      if (state) {
        this.snackBar.open(
          'Preferences saved.',
          'Dismiss',
          { extraClasses: 'cdy-snackbar-info', duration: 3000  },
        );
      }
    });
  }

}
