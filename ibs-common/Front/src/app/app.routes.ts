import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ChoixApplicationComponent } from './choix-application/choix-application.component';

export const routes: Routes = [
    { path: '', redirectTo: '/liste-appli', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'liste-appli', component: ChoixApplicationComponent },
];
