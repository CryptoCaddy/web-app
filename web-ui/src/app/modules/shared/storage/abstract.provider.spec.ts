import { TestBed, inject } from '@angular/core/testing';

import { AbstractProvider } from './abstract.provider';

describe('AbstractProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AbstractProvider ],
    });
  });

  it('should be created', inject([ AbstractProvider ], (service: AbstractProvider) => {
    expect(service).toBeTruthy();
  }));
});
