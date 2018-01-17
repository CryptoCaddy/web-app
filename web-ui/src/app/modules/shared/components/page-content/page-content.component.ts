import { Component, Input, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cdy-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: [ './page-content.component.scss' ],
})
export class PageContentComponent implements OnInit {

  @Input()
  @HostBinding('class.cdy-small')
  small: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
