import { Routes } from '@angular/router';
import { AppProgrammeComponent } from './programme/programme.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppProgrammeComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
