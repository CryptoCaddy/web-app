import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExchangeDialogComponent } from './add-exchange-dialog.component';

describe('AddExchangeDialogComponent', () => {
  let component: AddExchangeDialogComponent;
  let fixture: ComponentFixture<AddExchangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExchangeDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExchangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
