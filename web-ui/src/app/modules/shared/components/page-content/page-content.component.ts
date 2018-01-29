import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cdy-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: [ './page-content.component.scss' ],
})
export class PageContentComponent {

  @Input()
  @HostBinding('class.cdy-small')
  small: boolean = false;

}
