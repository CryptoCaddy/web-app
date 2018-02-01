import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BaseFormComponent } from './base-form.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/** Mocked form component for testing {@link BaseFormComponent} */
@Component({
  selector: 'cdy-mock-form',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <div [formGroupName]="'user'">
        <mat-form-field #formField>
          <input matInput [formControlName]="'email'" type="email">
          <mat-error *ngIf="getErrorMessage(form.get('user.email')); let errMsg">{{ errMsg }}</mat-error>
        </mat-form-field>

        <mat-form-field #formField>
          <input matInput [formControlName]="'password'" type="password">
          <mat-error *ngIf="getErrorMessage(form.get('user.password')); let errMsg">{{ errMsg }}</mat-error>
        </mat-form-field>
      </div>

      <!-- Hidden button allows submitting by pressing enter -->
      <button type="submit" hidden></button>
    </form>
  `,
})
class MockFormComponent extends BaseFormComponent {

  public submitCalled = jest.fn();
  public submitProcessing = jest.fn();
  public submitFinished = jest.fn();

  protected initForm(): void {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl(null, [ Validators.required ]),
        password: new FormControl(null, [ Validators.required ]),
      }),
    });
  }

  public submit(): void {
    this.submitCalled();
    if (!this.canSubmit()) { return; }
    this.pending.next(true);
    this.submitProcessing();

    setTimeout(() => {
      this.pending.next(false);
      this.submitFinished();
    }, 1000);
  }
}

/** Form component not initializing a form. */
@Component({
  selector: 'cdy-invalid-form-mock',
  template: ``,
})
class MockInvalidFormComponent extends BaseFormComponent {
  public submitCalled = jest.fn();
  public submitProcessing = jest.fn();
  public submitFinished = jest.fn();

  protected initForm(): void { }
  public submit(): void { }
}

describe('BaseFormComponent', () => {
  let component: MockFormComponent|MockInvalidFormComponent;
  let fixture: ComponentFixture<MockFormComponent|MockInvalidFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [
        MockFormComponent,
        MockInvalidFormComponent,
      ],
    })
    .compileComponents();
  }));

  function useInvalidFormComponent() {
    fixture = TestBed.createComponent(MockInvalidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function useValidFormComponent() {
    fixture = TestBed.createComponent(MockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function resetComponentSpies() {
    component.submitCalled.mockReset();
    component.submitFinished.mockReset();
  }

  it('should create', () => {
    useValidFormComponent();
    expect(component).toBeTruthy();
  });

  it('make sure a form was initialized', () => {
    expect(() => useInvalidFormComponent()).toThrowError('MockInvalidFormComponent: "form" not initialized.');
    expect(component.form).toBeUndefined();

    expect(() => useValidFormComponent()).not.toThrow();
    expect(component.form).toBeDefined();
  });

  describe('#submit', () => {
    it('should protect the form from beeing submitted if it is invalid', () => {
      useValidFormComponent();

      component.submit();
      expect(component.submitCalled).toHaveBeenCalled();
      expect(component.submitFinished).not.toHaveBeenCalled();

      resetComponentSpies();
      component.form.get('user.email').setValue('foo@bar');
      component.submit();
      expect(component.submitCalled).toHaveBeenCalled();
      expect(component.submitFinished).not.toHaveBeenCalled();

      resetComponentSpies();
      component.form.get('user.email').setValue('');
      component.form.get('user.password').setValue('Passw0rd');
      component.submit();
      expect(component.submitCalled).toHaveBeenCalled();
      expect(component.submitFinished).not.toHaveBeenCalled();
    });

    it('should protect the form from beeing re-submitted as long as it\'s pending', fakeAsync(() => {
      useValidFormComponent();

      component.submit();
      expect(component.submitCalled).toHaveBeenCalledTimes(1);
      expect(component.submitProcessing).toHaveBeenCalledTimes(0);
      expect(component.submitFinished).toHaveBeenCalledTimes(0);

      component.form.setValue({ user: { email: 'foo@bar', password: 'Passw0rd' } });
      component.submit();
      expect(component.submitCalled).toHaveBeenCalledTimes(2);
      expect(component.submitProcessing).toHaveBeenCalledTimes(1);
      expect(component.submitFinished).toHaveBeenCalledTimes(0);

      tick(600);
      component.submit();
      expect(component.submitCalled).toHaveBeenCalledTimes(3);
      expect(component.submitProcessing).toHaveBeenCalledTimes(1);
      expect(component.submitFinished).toHaveBeenCalledTimes(0);

      tick(600);
      component.submit();
      expect(component.submitCalled).toHaveBeenCalledTimes(4);
      expect(component.submitProcessing).toHaveBeenCalledTimes(2);
      expect(component.submitFinished).toHaveBeenCalledTimes(1);

      tick(1000);
    }));
  });

  describe('#focus', () => {
    it('allows focusing the first form control', () => {
      useValidFormComponent();
      const formFields: NodeList = fixture.nativeElement.querySelectorAll('input,select');
      spyOn(formFields.item(0), 'focus');
      spyOn(formFields.item(1), 'focus');

      component.focus();
      expect((<HTMLElement>formFields.item(0)).focus).toHaveBeenCalled();
      expect((<HTMLElement>formFields.item(1)).focus).not.toHaveBeenCalled();
    });

    it('should handle non-existent form fields', () => {
      try {
        useInvalidFormComponent();
      } catch (e) { }

      expect(() => component.focus()).not.toThrow();
    });
  });
});
