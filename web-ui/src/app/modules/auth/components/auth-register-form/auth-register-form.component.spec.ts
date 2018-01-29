import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterFormComponent } from './auth-register-form.component';

describe('AuthRegisterFormComponent', () => {
  let component: AuthRegisterFormComponent;
  let fixture: ComponentFixture<AuthRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
