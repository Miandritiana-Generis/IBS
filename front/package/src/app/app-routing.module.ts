import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppDashboardComponent } from './pages/dashboard/dashboard.component';
import { AppFichePresenceComponent } from './pages/fiche-presence/fiche-presence.component';
import { AppListeAbsence } from './pages/liste-absence/liste-absence.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
        canActivate: [authGuard],
        children:[
          {
            path: '',
            component: FullComponent,
            children: [
              {
                path: '',
                redirectTo: '/programme',
                pathMatch: 'full',
              },
              {
                path: 'programme',
                loadChildren: () =>
                  import('./pages/pages.module').then((m) => m.PagesModule),
              },
              {
                path: 'dashboard',
                component: AppDashboardComponent,
              },
              {
                path: 'fiche-presence',
                component: AppFichePresenceComponent,
              },
              {
                path: 'extra',
                loadChildren: () =>
                  import('./pages/extra/extra.module').then((m) => m.ExtraModule),
              },
              {
                path: 'liste-absence',
                component: AppListeAbsence,
              },
            ],
          },
          {
            path: '',
            component: BlankComponent,
            children: [
              {
                path: 'salle',
                loadChildren: () =>
                  import('./pages/ui-components/ui-components.module').then(
                    (m) => m.UicomponentsModule
                  ),
              },
            ],
          },
        ]
  },
          {
            path: '',
            component: BlankComponent,
            children: [
              {
                path: 'authentication',
                loadChildren: () =>
                  import('./pages/authentication/authentication.module').then(
                    (m) => m.AuthenticationModule
                  ),
              },
            ],
          },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
