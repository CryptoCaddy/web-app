import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormAbstractComponent } from 'app/modules/shared/components/base-form/base-form.abstract-component';
import { SelectOption } from 'app/modules/shared/models/select-option.model';
import { ArrayUtil } from 'app/modules/shared/utils/array.util';
import { SelectOptionUtil } from 'app/modules/shared/utils/select-option.util';
import { ArrayValidators } from 'app/modules/shared/validators/array.validators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { finalize, mergeMap, startWith, take } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';

import { getHttpErrorMessage } from '../../../shared/utils/http.util';
import { SupportedExchange } from '../../models/supported-exchange.model';
import { ExchangesProvider } from '../../storages/exchanges.provider';
import { SupportedExchangesProvider } from '../../storages/supported-exchanges.provider';

interface FormValue {
  exchange: SelectOption<string>;
  parameters: {
    [key: string]: string|number;
  };
}

@Component({
  selector: 'cdy-add-exchange-form',
  templateUrl: './add-exchange-form.component.html',
  styleUrls: [ './add-exchange-form.component.scss' ],
})
export class AddExchangeFormComponent extends BaseFormAbstractComponent {

  /** Stream of filtered exchanges to display. */
  public filteredExchanges$: Observable<SelectOption<string>[]>;

  /** Stream of all supported exchanges. */
  public supportedExchanges$: Observable<SelectOption<string>[]>;

  private parameterControlNames = new BehaviorSubject<string[]>([ ]);
  public parameterControlNames$ = this.parameterControlNames.asObservable();

  private selectedExchange = new BehaviorSubject<SupportedExchange>(null);

  constructor(
    private supportedExchangesProvider: SupportedExchangesProvider,
    private exchangesProvider: ExchangesProvider,
  ) {
    super();

    this.supportedExchanges$ = this.supportedExchangesProvider.data$.pipe(
      map((supportedExchanges) => supportedExchanges.map((supportedExchange) => ({
        label: supportedExchange.exchangeName,
        value: supportedExchange.exchangeName,
      }))),
    );

    this.selectedExchange.subscribe((exchange) => this.exchangeChanged(exchange));
  }

  public submit() {
    if (!this.canSubmit()) {
      return;
    }
    this.pending.next(true);

    const formValue: FormValue = this.form.value;
    const payload = {
      exchangeName: formValue.exchange.value,
      parameters: formValue.parameters,
    };

    this.exchangesProvider.add(payload)
      .pipe(finalize(() => this.pending.next(false)))
      .subscribe(
        () => this.completed.next(true),
        (err: HttpErrorResponse) => this.setFormErrors(err),
      );
  }

  protected initForm() {
    this.form = new FormGroup({
      'exchange': new FormControl(
        null,
        [ Validators.required ],
        [ ArrayValidators.includedIn$(this.supportedExchanges$) ],
      ),
      'parameters': new FormGroup({ }),
    });

    this.filteredExchanges$ = this.form.get('exchange').valueChanges
      .pipe(
        startWith(null),
        mergeMap((input: string|null) => SelectOptionUtil.filterByLabel$(this.supportedExchanges$, input)),
      );

    this.handleFormChanges();
  }

  private handleFormChanges() {
    this.form.get('exchange').valueChanges.subscribe((value) => {
      if (!value) { return; }
      if (!this.form.get('exchange').valid) { return; }

      this.supportedExchangesProvider.data$.pipe(
        take(1),
        map((xs) => xs.filter((x) => x.exchangeName === value.value)),
      ).subscribe(([ exchange ]) => this.selectedExchange.next(exchange));
    });
  }

  /** Update paramter form fields when the form changes */
  private exchangeChanged(exchange: SupportedExchange) {
    if (!exchange) { return; }

    const params: string[] = exchange.parameterList.map((p) => p.parameter);
    const parametersFormGroup = this.form.get('parameters') as FormGroup;

    // Remove parameters that do not exist in the selected exchange from the form group
    for (const key of Object.keys(parametersFormGroup.controls)) {
      if (!params.includes(key)) {
        parametersFormGroup.removeControl(key);

        this.parameterControlNames.next(
          ArrayUtil.remove(this.parameterControlNames.value, key),
        );
      }
    }

    // Add parameters missing in the form group
    for (const parameter of exchange.parameterList) {
      const key = parameter.parameter;
      if (!parametersFormGroup.contains(key)) {
        parametersFormGroup.addControl(
          key,
          new FormControl(null, [ Validators.required ]),
        );

        this.parameterControlNames.next(
          ArrayUtil.add(this.parameterControlNames.value, key),
        );
      }
    }
  }

  private setFormErrors(err: HttpErrorResponse) {
    this.form.setErrors({
      generic: getHttpErrorMessage(err),
    });
  }

}
