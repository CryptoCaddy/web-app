import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdy-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: [ './table-wrapper.component.scss' ],
})
export class TableWrapperComponent {

  @Input()
  public loading: boolean = false;

}
