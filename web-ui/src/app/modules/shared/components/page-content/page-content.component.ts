import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cdy-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: [ './page-content.component.scss' ],
})
export class PageContentComponent {

  @Input()
  public size: 'tiny'|'small'|'regular' = 'regular';

  @HostBinding('class.cdy-small')
  private get isSmall() { return this.size === 'small'; }

  @HostBinding('class.cdy-tiny')
  private get isTiny() { return this.size === 'tiny'; }

}
