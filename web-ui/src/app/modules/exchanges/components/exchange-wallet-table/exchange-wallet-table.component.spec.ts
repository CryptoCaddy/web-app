import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExchangeWalletsDatabase } from '../../storages/exchange-wallets.database';
import { ExchangeWalletsProvider } from '../../storages/exchange-wallets.provider';
import { ExchangeWalletTableComponent } from './exchange-wallet-table.component';

class ExchangeWalletServiceMock {
  public database: Partial<ExchangeWalletsDatabase> = {
    data: [ ],
    data$: new BehaviorSubject([ ]),
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
        { provide: ExchangeWalletsProvider, useClass: ExchangeWalletServiceMock },
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
