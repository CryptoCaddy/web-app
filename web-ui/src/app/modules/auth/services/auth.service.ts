import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthUser } from '../models/auth-user.model';
import { extractUserData } from '../utils/auth.util';

@Injectable()
export class AuthService {

  /** Observer that broadcasts to the {@link user$} stream. */
  private user = new ReplaySubject<AuthUser>(1);

  /** Stream that emits when the data changes. */
  public user$ = this.user.asObservable();

  /** Stream that emits whether the user is logged in */
  public loggedIn$: Observable<boolean>;

  private registrationInProgress$ = new BehaviorSubject<boolean>(false);

  private _token: string;
  public get token(): string {
    return this._token;
  }

  /**
   * Stores the previous authentication state.
   * Must initlially be undefined to be able to determine the inital state.
   */
  private previousState: boolean;

  constructor(
    private appConfig: AppConfigService,
    private fireAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
  ) {
    // Set up streams and auth change detection.
    this.fireAuth.idToken.subscribe((token) => this._token = token);

    // Streaming whether the user is logged
    this.loggedIn$ = combineLatest(
      this.user$,
      this.registrationInProgress$,
    ).pipe(map(([ user, registrationInProgress ]) => user && !registrationInProgress));

    // Update the user stream
    this.fireAuth.authState.subscribe((state) => this.user.next(extractUserData(state)));

    // React to login changes by automatic routing
    combineLatest(
      this.fireAuth.authState,
      this.registrationInProgress$,
    ).subscribe(([ state, registartionInProgress ]) => {

      // Don't handle auth changes as long as the user is in the signup process
      if (registartionInProgress) { return; }

      const newState: boolean = state != null;

      // If this is not the initial state, perform an action based on the new state
      if (this.previousState !== undefined) {
        this.onAuthStateChange(newState);
      }

      this.previousState = newState;
    });
  }

  /** Sign up on firebase and our backend. */
   public signUp(email: string, password: string): Observable<firebase.User|null> {
    return fromPromise(this.fireAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(tap((firebaseUser: firebase.User) => {

        // Send the id token to our backend as well to set up the user account
        firebaseUser.getIdToken().then((token: string) => {
          const payload = { token, email: firebaseUser.email };
          this.http.post(`${this.appConfig.apiUri}/createAccount`, payload).subscribe();
        });

      }));
  }

  /** Try to sign in using the given credentials. */
  public signIn(email: string, password: string): Observable<firebase.User|null> {
    return fromPromise(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  /** Sign out. */
  public signOut(): Observable<any> {
    return fromPromise(this.fireAuth.auth.signOut());
  }

  /** Set the registrationInProgress stream. This prevents loggedIn$ to be truthy until finished. */
  public registrationStarted() {
    this.registrationInProgress$.next(true);
  }

  /** Set the registartionInProgress stream. This allows loggedIn$ to become truthy again.  */
  public registrationFinished() {
    this.registrationInProgress$.next(false);
  }

  /** Handle authentication state changes (only true or false, no changes to user data) */
  private onAuthStateChange(state: boolean): void {
    state ? this.onLogin() : this.onLogout();
  }

  /** Perform actions if the user logged in. */
  private onLogin(): void {
    this.router.navigateByUrl('/home');
  }

  /** Perform actions if the user logged out. */
  private onLogout(): void {
    this.router.navigateByUrl('/auth');
  }

}
