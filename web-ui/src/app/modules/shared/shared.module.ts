import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { ButtonContentComponent } from './components/button-content/button-content.component';
import { CardHeaderToolbarComponent } from './components/card-header-toolbar/card-header-toolbar.component';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { BaseFormAbstractComponent } from './components/base-form/base-form.abstract-component';

/**
 * The applications shared module.
 *
 * Only only imports 3rd party modules and exports components that do not
 * depend on other modules of this application.
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  declarations: [
    // Workaround: abstract modules must also be declared
    // https://github.com/angular/angular/issues/13590
    <any>BaseFormAbstractComponent,
    ButtonContentComponent,
    CardHeaderToolbarComponent,
    CardWrapperComponent,
    PageContentComponent,
    TableWrapperComponent,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    <any>BaseFormAbstractComponent,
    ButtonContentComponent,
    CardWrapperComponent,
    CardHeaderToolbarComponent,
    PageContentComponent,
    TableWrapperComponent,
  ],
})
export class SharedModule { }
