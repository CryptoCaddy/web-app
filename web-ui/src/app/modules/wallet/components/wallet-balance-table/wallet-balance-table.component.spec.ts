import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceTableComponent } from './wallet-balance-table.component';

describe('WalletBalanceTableComponent', () => {
  let component: WalletBalanceTableComponent;
  let fixture: ComponentFixture<WalletBalanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBalanceTableComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
