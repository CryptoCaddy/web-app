import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonContentComponent } from './component';

describe('ButtonContentComponent', () => {
  let component: ButtonContentComponent;
  let fixture: ComponentFixture<ButtonContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonContentComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
