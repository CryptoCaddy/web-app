import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

/** Http interceptor for adding authorization headers to every request. */
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  private get auth(): AuthService {
    /**
     * Load authService via injector on demand to avoid circular dependency.
     * @see https://github.com/angular/angular/issues/18224
     */
    return this.injector.get(AuthService);
  }

  constructor(
    private injector: Injector,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.auth.token}` },
    });

    return next.handle(request);
  }

}
