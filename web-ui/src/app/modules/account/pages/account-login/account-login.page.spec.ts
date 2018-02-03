import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginPage } from './account-login.page';

describe('AccountLoginPage', () => {
  let component: AccountLoginPage;
  let fixture: ComponentFixture<AccountLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLoginPage ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
