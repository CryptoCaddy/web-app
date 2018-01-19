import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { ExchangeWalletService } from '../../services/exchange-wallet.service';
import { ExchangeWalletFormComponent } from './exchange-wallet-form.component';

class ExchangeWalletServiceMock {
  public database: any = {
    init: (...args) => { },
    errorChange: of(null),
  };

  public initialize(exchange: string, apiKey: string, apiSecret: string, password?: string): void {
    return;
  }
}

describe('ExchangeWalletFormComponent', () => {
  let component: ExchangeWalletFormComponent;
  let fixture: ComponentFixture<ExchangeWalletFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeWalletFormComponent ],
      providers: [
        { provide: ExchangeWalletService, useClass: ExchangeWalletServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeWalletFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
