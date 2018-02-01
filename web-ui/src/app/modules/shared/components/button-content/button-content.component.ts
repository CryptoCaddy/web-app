import { Component, Input, HostBinding } from '@angular/core';

export type SpinnerColor = 'primary'|'accent'|'warn'|'white';

@Component({
  selector: 'cdy-button-content',
  templateUrl: './button-content.component.html',
  styleUrls: [ './button-content.component.scss' ],
})
export class ButtonContentComponent {

  @Input()
  public loading: boolean;

  @Input()
  public spinnerColor: SpinnerColor = 'primary';

  @Input()
  public spinnerMode: 'determinate'|'indeterminate' = 'indeterminate';

  @HostBinding('class.cdy-spinner-white')
  private get spinnerIsWhite() {
    return this.spinnerColor === 'white';
  }

}
