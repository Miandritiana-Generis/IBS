import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Constants } from '../util/constants';
import moment from 'moment';
import { LoaderService } from '../services/loader.service';
import {Token} from '../modeles/Token'

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private tokenKey="auth-token";
  private nomKey="nom";
  private loginKey="login";
  private exerciceActifKey = "exercice-actif";
  private utilisateurCodeKey = "utilisateur-code";
  private exprirationKey="expiration";
  private superutilisateur="superutilisateur";
  private url=Constants.BASE_URL;

  constructor(private http: HttpClient, private router: Router,
    private loaderService : LoaderService,) {
    this.loggedIn.next(this.isAuthenticated());
  }

  login(username: string, password: string,idApplication:string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Id-Application': idApplication
    });
    this.loaderService.show();
    return this.http.post<Token>(`${this.url}/login`, {login: username, mdp:password},{ headers })
      .pipe(
        map(response => {
          this.loaderService.hide();
          if (response.token) {
              localStorage.setItem(this.tokenKey, response.token.token);
              this.loggedIn.next(true);
              const token = response.token.token;
              const lien=response.tokenApplication.lien
              window.location.href = `${lien}login?token=${encodeURIComponent(token)}`;

            return true;

          } else {
            return false;
          }
        }),
        catchError(error => {
          this.loaderService.hide();
          return throwError(() => new Error(error.error.erreurs[0].messageErreur));
        })
      );
  }

  logout(): void {
    this.loaderService.show();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    this.http.get(`${this.url}/logout`,{headers})
      .pipe(
        map(response => {
          this.loaderService.hide();
          localStorage.clear()
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
          return true; // Ajouté pour indiquer un succès
        }),
        catchError(error => {
          this.loaderService.hide();
          localStorage.clear()
          return throwError(() => new Error(error.error.erreurs[0].messageErreur));
        })
      )
      .subscribe(
        success => {
          // Optionnel: traiter les actions supplémentaires après la réussite du logout
        }
      );
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expirationDate = localStorage.getItem(this.exprirationKey);
    if(expirationDate!=null){
      let date= moment(expirationDate.replace(/"/g, ''));
      let now=moment();
      if(date.isBefore(now)){
         this.logout();
      }
    }
    return token ? true : false;
  }

  getLogin(): string | null {
    return localStorage.getItem(this.loginKey);
  }

  getNom(): string | null {
    return localStorage.getItem(this.nomKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getExcerciceEnCour():{"id":number,"annee":number,"est_cloture":boolean,"active":boolean}{
    const excercice:string | null  = localStorage.getItem(this.exerciceActifKey);
    return JSON.parse(excercice !== null ? excercice:"{}");
  }

  getCodeUtilisateur():{"id":number,"numero":number,"description":string,"entite":{"id":number,"nom":string}}{
    const code:string | null  = localStorage.getItem(this.utilisateurCodeKey);
    return JSON.parse(code !== null ? code:"{}");
  }
}
