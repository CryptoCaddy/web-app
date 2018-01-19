import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeWalletComponent } from './exchange-wallet.component';

describe('ExchangeWalletComponent', () => {
  let component: ExchangeWalletComponent;
  let fixture: ComponentFixture<ExchangeWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeWalletComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
