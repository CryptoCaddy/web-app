import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExchangeWalletService } from '../../services/exchange-wallet.service';
import { ExchangeWalletTableComponent } from './exchange-wallet-table.component';
import { MatTableModule } from '@angular/material';
import { ExchangeCoinDatabase } from 'app/modules/demo/storage/exchange-coin.database';

class ExchangeWalletServiceMock {
  public database: Partial<ExchangeCoinDatabase> = {
    data: [ ],
    init: (...args) => { },
    errorChange: new BehaviorSubject(null),
    dataChange: new BehaviorSubject([ ]),
    loadingChange: new BehaviorSubject(false),
  };

  public initialize(exchange: string, apiKey: string, apiSecret: string, password?: string): void {
    return;
  }
}

describe('ExchangeWalletTableComponent', () => {
  let component: ExchangeWalletTableComponent;
  let fixture: ComponentFixture<ExchangeWalletTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
      ],
      declarations: [ ExchangeWalletTableComponent ],
      providers: [
        { provide: ExchangeWalletService, useClass: ExchangeWalletServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeWalletTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
