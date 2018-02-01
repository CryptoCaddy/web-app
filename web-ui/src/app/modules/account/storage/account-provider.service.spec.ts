import { TestBed, inject } from '@angular/core/testing';

import { AccountProvider } from './account-provider.service';

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
