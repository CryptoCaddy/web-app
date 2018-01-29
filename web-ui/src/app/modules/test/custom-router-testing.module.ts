import { APP_BASE_HREF } from '@angular/common';
import { ElementRef, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  imports: [
    // Intercept "cannot match any routes™ by routing everything to the app's root
    RouterTestingModule.withRoutes([ { path: '**', redirectTo: '' } ]),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: ElementRef, useValue: { nativeElement: {} } },
  ],
  exports: [ RouterTestingModule ],
})
export class CustomRouterTestingModule { }
