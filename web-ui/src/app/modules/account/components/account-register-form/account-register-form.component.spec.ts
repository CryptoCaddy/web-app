import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { AccountRegisterFormComponent } from './account-register-form.component';

class AuthServiceMock {
  signUp: Observable<any> = _throw(`${this.constructor.name}#signUp: Property not mocked`);
}

describe('AccountRegisterFormComponent', () => {
  let component: AccountRegisterFormComponent;
  let fixture: ComponentFixture<AccountRegisterFormComponent>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountRegisterFormComponent,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterFormComponent);
    component = fixture.componentInstance;
    auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submitting the form', () => {
    it('should only try to sign up when the form is valid', () => {
      const signUpSpy = spyOn(auth, 'signUp').and.returnValue(of({ }));

      // No values at all
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signUp).not.toHaveBeenCalled();

      // email only
      signUpSpy.calls.reset();
      component.form.get('email').setValue('foo@bar');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signUp).not.toHaveBeenCalled();

      // email and password
      signUpSpy.calls.reset();
      component.form.get('password').setValue('Passw0rd');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signUp).not.toHaveBeenCalled();

      // All values provided
      signUpSpy.calls.reset();
      component.form.get('passwordRepeat').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signUp).toHaveBeenCalled();

      // Only password and passwordRepeat
      signUpSpy.calls.reset();
      component.form.get('email').setValue('');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signUp).not.toHaveBeenCalled();
    });

    it('should successfully login with valid credentials', () => {
      const signUpSpy = spyOn(auth, 'signUp').and.returnValue(of({ }));

      // All values provided
      component.form.get('email').setValue('foo@bar');
      component.form.get('password').setValue('Passw0rd');
      component.form.get('passwordRepeat').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signUp).toHaveBeenCalledWith('foo@bar', 'Passw0rd');
      expect(component.form.errors).toBeFalsy();

      // email and passwordRepeat only
      signUpSpy.calls.reset();
      component.form.get('password').setValue('');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signUp).not.toHaveBeenCalledWith();
    });

    it('should fail when there was an error', () => {
      spyOn(auth, 'signUp').and.returnValue(_throw({ message: 'User already exists.' }));

      // All values provided
      component.form.get('email').setValue('foo@bar');
      component.form.get('password').setValue('Passw0rd');
      component.form.get('passwordRepeat').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signUp).toHaveBeenCalledWith('foo@bar', 'Passw0rd');
      expect(component.form.errors).toBeTruthy();
      expect(component.form.errors).toEqual({ generic: 'User already exists.' });
    });
  });

});
