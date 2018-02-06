import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthModule } from 'app/modules/auth/auth.module';
import { ExchangesApiService } from 'app/modules/exchanges/services/exchanges-api.service';
import { SupportedExchangesApiService } from 'app/modules/exchanges/services/supported-exchanges-api.service';
import { ExchangesProvider } from 'app/modules/exchanges/storages/exchanges.provider';
import { SupportedExchangesProvider } from 'app/modules/exchanges/storages/supported-exchanges.provider';
import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.page';
import { CoreModule } from './modules/core/core.module';
import { WalletsProvider } from './modules/wallet/providers/wallets.provider';
import { WalletsApiService } from './modules/wallet/services/wallets-api.service';

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [
    ExchangesApiService,
    ExchangesProvider,
    SupportedExchangesApiService,
    SupportedExchangesProvider,
    WalletsProvider,
    WalletsApiService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
