import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesSetupPage } from './exchanges-setup.page';

describe('ExchangesSetupPage', () => {
  let component: ExchangesSetupPage;
  let fixture: ComponentFixture<ExchangesSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesSetupPage ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
