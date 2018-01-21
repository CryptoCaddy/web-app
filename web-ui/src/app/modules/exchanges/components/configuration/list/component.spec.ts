import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesConfigurationListComponent } from './component';

describe('ExchangesConfigurationListComponent', () => {
  let component: ExchangesConfigurationListComponent;
  let fixture: ComponentFixture<ExchangesConfigurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesConfigurationListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
