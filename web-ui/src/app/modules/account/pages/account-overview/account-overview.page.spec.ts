import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOverviewPage } from './account-overview.page';

describe('AccountOverviewComponent', () => {
  let component: AccountOverviewPage;
  let fixture: ComponentFixture<AccountOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOverviewPage ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
