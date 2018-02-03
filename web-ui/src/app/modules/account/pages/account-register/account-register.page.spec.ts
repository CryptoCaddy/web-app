import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterPage } from './account-register.page';

describe('AccountRegisterPage', () => {
  let component: AccountRegisterPage;
  let fixture: ComponentFixture<AccountRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRegisterPage ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
