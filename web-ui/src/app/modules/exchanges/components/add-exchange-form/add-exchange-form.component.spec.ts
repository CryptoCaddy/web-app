import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExchangeFormComponent } from './add-exchange-form.component';

describe('AddExchangeFormComponent', () => {
  let component: AddExchangeFormComponent;
  let fixture: ComponentFixture<AddExchangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExchangeFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExchangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
