import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesPage } from './page';

describe('ExchangesPage', () => {
  let component: ExchangesPage;
  let fixture: ComponentFixture<ExchangesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesPage ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
