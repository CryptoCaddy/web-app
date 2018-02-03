import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { CustomRouterTestingModule } from 'app/modules/test/custom-router-testing.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from './auth.service';

class FireAuthMock {
  idToken = new BehaviorSubject(null);
  authState = new BehaviorSubject(null);
  auth = {
    signInWithEmailAndPassword: async() => null,
    signOut: async() => null,
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let fireAuthMock: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomRouterTestingModule,
      ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: FireAuthMock },
      ],
    });

    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fireAuthMock = TestBed.get(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide the token and user state of AngularFireAuth', () => {
    const userSuccessFn = jest.fn();
    const userErrorFn = jest.fn();
    service.user$.subscribe(userSuccessFn, userErrorFn);

    expect(service.token).toBeNull();
    expect(userSuccessFn).toHaveBeenCalledWith(null);
    expect(userErrorFn).not.toHaveBeenCalled();

    userSuccessFn.mockReset();
    userErrorFn.mockReset();
    (fireAuthMock.idToken as any).next('exampleToken');
    (fireAuthMock.authState as any).next({ email: 'user@example.com' });

    expect(service.token).toEqual('exampleToken');
    expect(userSuccessFn).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(userErrorFn).not.toHaveBeenCalled();
  });

  describe('#signIn', () => {
    it('should return a succeeding observable if successful', fakeAsync(() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();
      service.signIn('user', 'pass').subscribe(successFn, errorFn);
      tick();

      expect(successFn).toHaveBeenCalled();
      expect(errorFn).not.toHaveBeenCalled();
    }));

    it('should throw an observable error if failing', fakeAsync(() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();
      jest.spyOn(fireAuthMock.auth, 'signInWithEmailAndPassword').mockReturnValue(Promise.reject(null));
      service.signIn('user', 'pass').subscribe(successFn, errorFn);
      tick();

      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    }));
  });

  describe('#logout', () => {
    it('should return a succeeding observable if successful', fakeAsync(() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();
      service.signOut().subscribe(successFn, errorFn);
      tick();

      expect(successFn).toHaveBeenCalled();
      expect(errorFn).not.toHaveBeenCalled();
    }));

    it('should throw an observable error if failing', fakeAsync(() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();
      jest.spyOn(fireAuthMock.auth, 'signOut').mockReturnValue(Promise.reject(null));
      service.signOut().subscribe(successFn, errorFn);
      tick();

      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    }));
  });

  describe('when initially loaded', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigateByUrl');
    });

    it('should not route', () => {
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

  describe('when authentication state changes on runtime', () => {
    beforeEach(() => {
      spyOn(router, 'navigateByUrl');
    });

    it('should route to /home when the user becomes authenticated', () => {
      expect(router.navigateByUrl).not.toHaveBeenCalled();

      (fireAuthMock.authState as any).next({ });
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should route to /auth when the user becomes unauthenticated', () => {
      expect(router.navigateByUrl).not.toHaveBeenCalled();

      (fireAuthMock.authState as any).next({ });
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');

      (fireAuthMock.authState as any).next(null);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth');
    });
  });

});
