import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AccountPreferencesFormComponent,
} from 'app/modules/account/components/account-preferences-form/account-preferences-form.component';
import { Subscription } from 'rxjs/Subscription';

import { AuthRegisterFormComponent } from '../../components/auth-register-form/auth-register-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cdy-auth-register-page',
  templateUrl: './auth-register.page.html',
  styleUrls: [ './auth-register.page.scss' ],
})
export class AuthRegisterPage implements OnInit, AfterViewInit, OnDestroy {

  /** Reference to the sign up form component. */
  @ViewChild('stepRegister')
  public stepRegister: AuthRegisterFormComponent;

  @ViewChild('stepAccountPreferences')
  public stepAccountPreferences: AccountPreferencesFormComponent;

  /** Current active step in the stepper. */
  public currentStep = 0;

  /** Map of internal subscriptions. Must be cleared on descrution. */
  private subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private auth: AuthService,
  ) { }

  /** @memberof OnInit */
  public ngOnInit() {
    this.auth.registrationStarted();
  }

  /** @memberof AfterViewInit */
  public ngAfterViewInit() {
    setTimeout(() => this.stepRegister.focus());

    // Wait for state changes on async validated forms.
    this.subscriptions.set(
      'registerCompleted',
      this.stepRegister.completed$.subscribe((state: boolean) => {
        if (!state) { return; }

        // Clean up subscription and proceed
        this.subscriptions.get('registerCompleted').unsubscribe();
        this.onNextStep(this.stepAccountPreferences);
      }),
    );

    // Wait for state changes on async validated forms.
    this.subscriptions.set(
      'accountPreferencesCompleted',
      this.stepAccountPreferences.completed$.subscribe((state: boolean) => {
        if (!state) { return; }

        // Clean up subscription and proceed
        this.subscriptions.get('accountPreferencesCompleted').unsubscribe();
        this.onNextStep();
      }),
    );
  }

  /** @memberof OnDestroy */
  public ngOnDestroy() {
    // Make sure to leave no open subscription behind
    this.subscriptions.forEach((s) => s.unsubscribe());

    // Auth needs to be notified of this.
    this.auth.registrationFinished();
  }

  /** Registration was finished. */
  public onFinished() {
    // Notify the auth service to update streams.
    this.auth.registrationFinished();
  }

  /** Proceed to next step */
  private onNextStep(nextForm?: any) {
    // Async form validations lock proceeding - therefore we delay the step change
    // to the next macro task allowing material stepper to register the change.
    setTimeout(() => {
      this.currentStep++;
    });
  }

}
