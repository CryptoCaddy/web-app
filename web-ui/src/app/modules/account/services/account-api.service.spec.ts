import { TestBed, inject } from '@angular/core/testing';

import { AccountApiService } from './account-api.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AccountApiService ],
    });
  });

  it('should be created', inject([ AccountApiService ], (service: AccountApiService) => {
    expect(service).toBeTruthy();
  }));
});
