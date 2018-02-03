import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { AccountLoginFormComponent } from './account-login-form.component';

class AuthServiceMock {
  signIn: Observable<any> = _throw(`${this.constructor.name}#signIn: Property not mocked`);
}

describe('AccountLoginFormComponent', () => {
  let component: AccountLoginFormComponent;
  let fixture: ComponentFixture<AccountLoginFormComponent>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLoginFormComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginFormComponent);
    component = fixture.componentInstance;
    auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submitting the form', () => {
    it('should only try to login when the form is valid', () => {
      const signInSpy = spyOn(auth, 'signIn').and.returnValue(of({ }));

      // No values
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signIn).not.toHaveBeenCalled();

      // email only
      signInSpy.calls.reset();
      component.form.get('email').setValue('foo@bar');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signIn).not.toHaveBeenCalled();

      // All values provided
      signInSpy.calls.reset();
      component.form.get('password').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signIn).toHaveBeenCalled();

      // password only
      signInSpy.calls.reset();
      component.form.get('email').setValue('');
      expect(component.form.valid).toEqual(false);
      component.submit();
      expect(auth.signIn).not.toHaveBeenCalled();
    });

    it('should successfully login with valid credentials', () => {
      const signInSpy = spyOn(auth, 'signIn').and.returnValue(of({ }));
      component.form.get('email').setValue('foo@bar');
      component.form.get('password').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signIn).toHaveBeenCalledWith('foo@bar', 'Passw0rd');
      expect(component.form.errors).toBeFalsy();

      signInSpy.calls.reset();
      component.form.get('password').setValue('');
      component.submit();
      expect(auth.signIn).not.toHaveBeenCalledWith();
    });

    it('should fail with invalid credentials', () => {
      spyOn(auth, 'signIn').and.returnValue(_throw({ message: 'Invalid credentials.' }));
      component.form.get('email').setValue('foo@bar');
      component.form.get('password').setValue('Passw0rd');
      expect(component.form.valid).toEqual(true);
      component.submit();
      expect(auth.signIn).toHaveBeenCalledWith('foo@bar', 'Passw0rd');
      expect(component.form.errors).toBeTruthy();
      expect(component.form.errors).toEqual({ auth: { message: 'Invalid credentials.' } });
    });
  });
});
