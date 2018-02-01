import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPreferencesFormComponent } from './account-preferences-form.component';

describe('AccountPreferencesComponent', () => {
  let component: AccountPreferencesFormComponent;
  let fixture: ComponentFixture<AccountPreferencesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPreferencesFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPreferencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
