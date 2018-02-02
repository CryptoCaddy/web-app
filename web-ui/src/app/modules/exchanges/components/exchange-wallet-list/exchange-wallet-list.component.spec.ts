import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { ExchangesDataSource } from '../../data-sources/exchanges.data-source';
import { ExchangeWalletListComponent } from './exchange-wallet-list.component';

const supportedExchangesDb = { data$: of([ ]) };
const exchangesDb = { data$: of([ ]) };

describe('ExchangeWalletListComponent', () => {
  let component: ExchangeWalletListComponent;
  let fixture: ComponentFixture<ExchangeWalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeWalletListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeWalletListComponent);
    component = fixture.componentInstance;

    component.dataSource = new ExchangesDataSource(<any>supportedExchangesDb, <any>exchangesDb);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
