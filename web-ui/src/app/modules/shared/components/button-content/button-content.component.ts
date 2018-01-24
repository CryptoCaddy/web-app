import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cdy-button-content',
  templateUrl: './button-content.component.html',
  styleUrls: [ './button-content.component.scss' ],
})
export class ButtonContentComponent {

  @Input()
  public loading: boolean;

  @Input()
  public spinnerColor: string;

  @Input()
  public spinnerMode: 'determinate'|'indeterminate' = 'indeterminate';

  @HostBinding('class.cdy-spinner-white')
  private get spinnerIsWhite() {
    return this.spinnerColor === 'white';
  }

}
