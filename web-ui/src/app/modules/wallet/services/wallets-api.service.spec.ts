import { TestBed, inject } from '@angular/core/testing';

import { WalletsApiService } from './wallets-api.service';

describe('WalletsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WalletsApiService ],
    });
  });

  it('should be created', inject([ WalletsApiService ], (service: WalletsApiService) => {
    expect(service).toBeTruthy();
  }));
});
