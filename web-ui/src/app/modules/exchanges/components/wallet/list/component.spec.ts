import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeWalletListComponent } from './component';

describe('ExchangeWalletListComponent', () => {
  let component: ExchangeWalletListComponent;
  let fixture: ComponentFixture<ExchangeWalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeWalletListComponent ],
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
