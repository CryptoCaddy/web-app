import { TestBed, inject } from '@angular/core/testing';

import { AbstractApiService } from './abstract-api.service';

describe('AbstractApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AbstractApiService ],
    });
  });

  it('should be created', inject([ AbstractApiService ], (service: AbstractApiService) => {
    expect(service).toBeTruthy();
  }));
});
