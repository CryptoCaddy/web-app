import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/modules/shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { NavComponent } from './components/nav/nav.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AppConfigService } from 'app/modules/shared/app-config.service';

/**
 * Core module containing components and services only imported by the AppModule.
 *
 * @export
 * @class CoreModule
 */
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    RouterModule.forChild([ ]),
  ],
  declarations: [
    FooterComponent,
    FourOhFourComponent,
    NavComponent,
  ],
  exports: [
    FooterComponent,
    FourOhFourComponent,
    NavComponent,
  ],

  // App-wide providers
  providers: [
    AppConfigService,
  ],

})
export class CoreModule {

  /**
   * Creates an instance of CoreModule.
   *
   * @param {CoreModule} parentModule
   */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
