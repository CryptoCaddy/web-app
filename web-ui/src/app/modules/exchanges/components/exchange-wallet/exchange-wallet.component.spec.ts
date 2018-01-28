import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { ExchangesApiService } from '../../services/exchanges-api.service';
import { ExchangeWalletsProvider } from '../../storages/exchange-wallets.provider';
import { ExchangeWalletComponent } from './exchange-wallet.component';

class ExchangeWalletsProviderMock { }

class ExchangesApiServiceMock {
  getWallet = () => of(null);
}

describe('ExchangeWalletComponent', () => {
  let component: ExchangeWalletComponent;
  let fixture: ComponentFixture<ExchangeWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ExchangeWalletsProvider, useClass: ExchangeWalletsProviderMock },
        { provide: ExchangesApiService, useClass: ExchangesApiServiceMock },
      ],
      declarations: [ ExchangeWalletComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeWalletComponent);
    component = fixture.componentInstance;
    component.exchange = { } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
