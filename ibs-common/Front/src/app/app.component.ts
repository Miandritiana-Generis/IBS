import { Component,  OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthentificationService } from './authentification/authentification.service';
import load from 'scriptjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { UtilisateurAccessComponent } from './utilisateur-access/utilisateur-access.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UtilisateurAccessComponent,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'front';

  constructor(private router: Router, private authentification: AuthentificationService) { }

  verifieConnexion(): boolean {
    return this.authentification.isAuthenticated();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  loadScripts(): void {
    load('assets/js/main.js', () => {
      console.log('Scripts main loaded mety tsara');
    });
  }
}
