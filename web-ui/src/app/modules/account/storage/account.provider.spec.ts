import { inject, TestBed } from '@angular/core/testing';

import { AccountProvider } from './account.provider';

describe('AccountProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AccountProvider ],
    });
  });

  it('should be created', inject([ AccountProvider ], (service: AccountProvider) => {
    expect(service).toBeTruthy();
  }));
});
