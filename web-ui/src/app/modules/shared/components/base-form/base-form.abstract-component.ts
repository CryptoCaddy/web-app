import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { getErrorMessage } from '../../utils/form.util';
import { SelectOptionUtil } from '../../utils/select-option.util';

@Component({
  selector: 'cdy-abstract-form',
  template: '<div></div>',
})
export abstract class BaseFormAbstractComponent implements OnInit {

  /** Provide getErrorMessage to templates. */
  public getErrorMessage = getErrorMessage;

  /** The form object. */
  public form: FormGroup;

  protected pending = new BehaviorSubject<boolean>(false);
  /** Stream that emits when the form submission is pending. */
  public readonly pending$ = this.pending.asObservable();

  protected completed = new BehaviorSubject<boolean>(false);
  /** Stream that emits when the form is successfully completed. */
  public completed$ = this.completed.asObservable();

  /** Determine displayed label of autocompletes. */
  public selectOptionDisplayFn = SelectOptionUtil.getLabel;

  /**
   * Query list of element refefences to form fields.
   */
  @ViewChildren('formField', { read: ElementRef })
  protected formFields: QueryList<ElementRef>;

  /** Initialization of the component. */
  public ngOnInit() {
    this.initForm();
    if (this.form == null) {
      throw new Error(`${this.constructor.name}: "form" not initialized.`);
    }
  }

  /** Initialization of the form. */
  protected abstract initForm(): void;

  /** Focus the first form control */
  public focus(): HTMLElement|null {
    if (!this.formFields || !this.formFields.length) {
      return null;
    }

    const firstElement = <HTMLElement>this.formFields.first.nativeElement;
    const htmlElement = <HTMLElement>firstElement.querySelector('input,select');
    htmlElement.focus();

    return htmlElement;
  }

  /**
   * Submit the form with the entered data.
   * Should call {@link canSubmit} to verify form validity and prevent simultaneous submissions.
   */
  public abstract submit(): void;

  /** Checks whether the form may be submitted. */
  protected canSubmit(): boolean  {

    // Prevent multiple simultaneously submissions
    if (this.pending.value) { return false; }

    // If the form is invalid, display errors for invalid form controls.
    if (!this.form.valid) {
      this.markFormGroupTouched(this.form);
      return false;
    }
    return true;
  }

  /** Marks all controls in a form group as touched. */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
