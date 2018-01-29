import { HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs/Observable/empty';

import { AuthService } from '../services/auth.service';
import { AuthHeaderInterceptor } from './auth-header.interceptor';

class AuthServiceMock {
  public token = '';
}

describe('AuthHeaderInterceptor', () => {
  let authService: AuthService;
  let interceptor: AuthHeaderInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthHeaderInterceptor,
        { provide: AuthService, useClass: AuthServiceMock },
      ],
    });

    authService = TestBed.get(AuthService);
    interceptor = TestBed.get(AuthHeaderInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header to an http request', () => {
    expect.assertions(1);

    (<AuthServiceMock>authService).token = 'exampleToken';

    const baseReqest = new HttpRequest('GET', '/api/v1/endpoint', {
      params: new HttpParams({ fromObject: { foo: 'bar' } }),
    });

    const next: HttpHandler = {
      handle: (req) => {
        expect(req.headers.get('Authorization')).toEqual('Bearer exampleToken');
        return empty();
      },
    };

    interceptor.intercept(baseReqest, next).subscribe();
  });
});
