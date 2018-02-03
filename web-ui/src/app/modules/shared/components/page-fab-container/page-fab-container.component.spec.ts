import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFabContainerComponent } from './page-fab-container.component';

describe('PageFabContainerComponent', () => {
  let component: PageFabContainerComponent;
  let fixture: ComponentFixture<PageFabContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFabContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
