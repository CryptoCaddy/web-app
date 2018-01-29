import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';

import { authRoutes } from './modules/auth/auth-routes';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';
import { FourOhFourComponent } from './modules/core/components/four-oh-four/four-oh-four.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  }, {
    path: 'auth',
    canActivate: [ NoAuthGuard ],
    children: authRoutes,
  }, {
    path: 'account',
    canActivate: [ AuthGuard ],
    loadChildren: 'app/modules/account/account.module#AccountModule',
  }, {
    path: 'home',
    canActivate: [ AuthGuard ],
    loadChildren: 'app/modules/home/home.module#HomeModule',
  }, {
    path: 'reports',
    canActivate: [ AuthGuard ],
    loadChildren: 'app/modules/reports/reports.module#ReportsModule',
  }, {
    path: 'exchanges',
    canActivate: [ AuthGuard ],
    loadChildren: 'app/modules/exchanges/exchanges.module#ExchangesModule',
  }, {
    path: '**',
    component: FourOhFourComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: !environment.production }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
