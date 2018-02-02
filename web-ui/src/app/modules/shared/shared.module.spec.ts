import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SharedModule } from './shared.module';

@Component({
  template: `
    <cdy-button-content></cdy-button-content>
    <cdy-card-wrapper></cdy-card-wrapper>
    <cdy-card-header-toolbar></cdy-card-header-toolbar>
    <cdy-page-content></cdy-page-content>
    <cdy-table-wrapper></cdy-table-wrapper>
  `,
})
class SpecComponent { }

describe('SharedModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      declarations: [
        SpecComponent,
      ],
    });
  });

  it('should be importable', () => {
    expect(true).toBe(true);
  });

  it('should only export defined components', () => {
    expect(() => {
      TestBed.createComponent(SpecComponent);
    }).not.toThrow();

    expect(() => {
      TestBed.overrideComponent(SpecComponent, { set: { template: '<cdy-unknown></cdy-unknown>' } });
      TestBed.createComponent(SpecComponent);
    }).toThrow();
  });

});
