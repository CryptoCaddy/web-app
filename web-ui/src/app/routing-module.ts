import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';

import { FourOhFourComponent } from './modules/core/components/four-oh-four/component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'auth', loadChildren: 'app/modules/auth/module#AuthModule' },
  { path: 'home', loadChildren: 'app/modules/home/module#HomeModule' },
  { path: 'reports', loadChildren: 'app/modules/reports/module#ReportsModule' },
  { path: 'exchanges', loadChildren: 'app/modules/exchanges/module#ExchangesModule' },
  { path: '**', component: FourOhFourComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: !environment.production }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
