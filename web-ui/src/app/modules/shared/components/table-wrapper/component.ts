import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdy-table-wrapper',
  templateUrl: './component.html',
  styleUrls: [ './component.scss' ],
})
export class TableWrapperComponent {

  @Input()
  public loading: boolean = false;

}
