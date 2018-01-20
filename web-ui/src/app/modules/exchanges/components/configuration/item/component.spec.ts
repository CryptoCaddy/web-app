import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeConfigurationItemComponent } from './component';

describe('ExchangeConfigurationItemComponent', () => {
  let component: ExchangeConfigurationItemComponent;
  let fixture: ComponentFixture<ExchangeConfigurationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeConfigurationItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeConfigurationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
