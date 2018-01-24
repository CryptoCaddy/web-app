import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AppConfigService ],
    });

    service = TestBed.get(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#apiUrl', () => {
    it('should return the api root endpoint', () => {
      expect(service.apiUri).toBe('/api');
    });
  });
});
