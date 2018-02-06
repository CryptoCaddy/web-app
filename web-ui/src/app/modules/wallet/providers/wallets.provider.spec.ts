import { TestBed, inject } from '@angular/core/testing';

import { WalletsProvider } from './wallets.provider';

describe('WalletsProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WalletsProvider ],
    });
  });

  it('should be created', inject([ WalletsProvider ], (service: WalletsProvider) => {
    expect(service).toBeTruthy();
  }));
});
