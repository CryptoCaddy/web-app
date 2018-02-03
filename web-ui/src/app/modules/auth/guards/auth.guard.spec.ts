import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomRouterTestingModule } from 'app/modules/test/custom-router-testing.module';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

class AuthServiceMock {

}

describe('AuthGuard', () => {
  let authService: AuthService;
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomRouterTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceMock },
      ],
    });

    authService = TestBed.get(AuthService);
    guard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should route to login if trying to access protected routes', () => {
    expect.assertions(2);
    authService.loggedIn$ = of(null);
    spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });
  });

  it('should not do anything if user is authenticated', () => {
    expect.assertions(2);
    authService.loggedIn$ = of({ } as any);
    spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(true);
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

});
