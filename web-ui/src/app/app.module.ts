import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthModule } from 'app/modules/auth/auth.module';
import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { RootPage } from './root.page';

@NgModule({
  declarations: [
    RootPage,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
  ],
  bootstrap: [
    RootPage,
  ],
})
export class AppModule { }
