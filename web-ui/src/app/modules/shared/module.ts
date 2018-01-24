import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { ButtonContentComponent } from './components/button-content/button-content.component';
import { CardHeaderToolbarComponent } from './components/card-header-toolbar/card-header-toolbar.component';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';

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

    ButtonContentComponent,
    CardWrapperComponent,
    CardHeaderToolbarComponent,
    PageContentComponent,
    TableWrapperComponent,
  ],
})
export class SharedModule { }
