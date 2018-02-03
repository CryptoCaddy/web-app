import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesSetupTableComponent } from './exchanges-setup-table.component';

describe('ExchangesSetupTableComponent', () => {
  let component: ExchangesSetupTableComponent;
  let fixture: ComponentFixture<ExchangesSetupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesSetupTableComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesSetupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
