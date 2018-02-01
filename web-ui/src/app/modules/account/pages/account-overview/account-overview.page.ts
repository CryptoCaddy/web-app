import { Component, OnInit, ViewChild } from '@angular/core';

import { AccountPreferencesFormComponent } from '../../components/account-preferences-form/account-preferences-form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cdy-account-overview',
  templateUrl: './account-overview.page.html',
  styleUrls: [ './account-overview.page.scss' ],
})
export class AccountOverviewPage implements OnInit {

  @ViewChild('accountPreferences')
  public accountPreferences: AccountPreferencesFormComponent;

  constructor(private snackBar: MatSnackBar) { }

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
