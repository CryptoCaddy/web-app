import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/modules/shared/module';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';

import { FooterComponent } from './components/footer/footer.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';

/**
 * Core module containing components and services only imported by the AppModule.
 *
 * @export
 * @class CoreModule
 */
@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    RouterModule.forChild([ ]),
  ],
  declarations: [
    FooterComponent,
    FourOhFourComponent,
    NavbarComponent,
  ],
  exports: [
    FooterComponent,
    FourOhFourComponent,
    NavbarComponent,
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
