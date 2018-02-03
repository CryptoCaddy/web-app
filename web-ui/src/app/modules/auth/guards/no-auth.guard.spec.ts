import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomRouterTestingModule } from 'app/modules/test/custom-router-testing.module';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import { NoAuthGuard } from './no-auth.guard';

class AuthServiceMock {

}

describe('NoAuthGuard', () => {
  let authService: AuthService;
  let guard: NoAuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomRouterTestingModule,
      ],
      providers: [
        NoAuthGuard,
        { provide: AuthService, useClass: AuthServiceMock },
      ],
    });

    authService = TestBed.get(AuthService);
    guard = TestBed.get(NoAuthGuard);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should route to /home if user is authenticated', () => {
    expect.assertions(2);
    authService.loggedIn$ = of({ } as any);
    spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  });

  it('should not do anything if user is not authenticated', () => {
    expect.assertions(2);
    authService.loggedIn$ = of(null);
    spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(true);
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

});
