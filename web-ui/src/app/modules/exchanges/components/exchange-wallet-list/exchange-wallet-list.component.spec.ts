import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeWalletListComponent } from './exchange-wallet-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
