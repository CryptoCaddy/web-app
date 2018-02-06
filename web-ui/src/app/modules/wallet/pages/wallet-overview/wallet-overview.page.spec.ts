import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletOverviewPage } from './wallet-overview.page';

describe('WalletOverviewComponent', () => {
  let component: WalletOverviewPage;
  let fixture: ComponentFixture<WalletOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletOverviewPage ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
