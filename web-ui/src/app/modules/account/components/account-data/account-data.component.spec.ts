import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDataComponent } from './account-data.component';

describe('AccountDataComponent', () => {
  let component: AccountDataComponent;
  let fixture: ComponentFixture<AccountDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDataComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
