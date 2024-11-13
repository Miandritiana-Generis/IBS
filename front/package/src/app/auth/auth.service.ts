import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Constants } from '../util/constants';
import { Token } from '../modeles/Token';
import { PersonneService } from '../services/personne.service';
import { Personne } from '../modeles/Personne';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private url=Constants.BASE_URL_COMMON;
  private urlInfoPersonne = Constants.BASE_URL_COMMON+'/personnes/info';
private urlAuthoPAT = Constants.BASE_URL+'/authorisationPAT';

  constructor(private router: Router, private http: HttpClient, 
    private personneService:PersonneService ) { }


  login(username: string, password: string,idApplication:string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Id-Application': idApplication
    });
    // this.loaderService.show();
    return this.http.post<Token>(`${this.url}/login`, {login: username, mdp:password},{ headers })
      .pipe(
        map(response => {
          // this.loaderService.hide();
          if (response.token) {
              localStorage.setItem(this.tokenKey, response.token.token);
              localStorage.setItem('id', `${response.token.idPersonne}`);
              const token = response.token.token;
              this.getInfo(token);
            
              
            return true;

          } else {
            return false;
          }
        }),
        catchError(error => {
          // this.loaderService.hide();
          return throwError(() => new Error(error.error.erreurs[0].messageErreur));
        })
      );
  }

  private getInfo(token: string): void {
    this.personneService.getInfoUtilisateur(token).subscribe(
      data=> {
        localStorage.setItem('id', `${data.id}`);
        localStorage.setItem('nom',data.nom);
        localStorage.setItem('prenom',data.prenom);
        localStorage.setItem('mail',data.mail);
        localStorage.setItem('contact',data.contact);
        localStorage.setItem('idPat',`${data.idPat}`);
        localStorage.setItem('idEnseignant',`${data.idEnseignant}`);
        localStorage.setItem('idDirection',`${data.idDirection}`);

       
        if(data.idPat != 0 && data.idDirection != '0' ){
          this.authorisationPAT((data.idPat).toString(), data.idDirection);
        }
        this.router.navigate(['/']).then(() => {
          window.location.reload(); // Recharger la page après la redirection
        });
      }
    );
  }

  

  

  logout(): void {
    var classe=localStorage.getItem('salle');
    // this.loaderService.show();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    this.http.get(`${this.url}/logout`,{headers})
      .pipe(
        map(response => {
          // this.loaderService.hide();
          localStorage.clear();
          localStorage.setItem('salle',`${classe}`);
          return true; // Ajouté pour indiquer un succès
        }),
        catchError(error => {
          // this.loaderService.hide();
          localStorage.clear()
          localStorage.setItem('salle',`${classe}`);
          return throwError(() => new Error(error.error.erreurs[0].messageErreur));
        })
      )
      .subscribe(
        success => {
          // Optionnel: traiter les actions supplémentaires après la réussite du logout
        }
      );
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  private authorisationPAT(id_pat: string | null, id_direction: string | null) {
      var url =`${this.urlAuthoPAT}?id_pat=${id_pat}&id_direction=${id_direction}`; 
    console.log(url)
      this.http.get<boolean>(url).subscribe(isAutho => {
      // Convert boolean to string and store in localStorage
      localStorage.setItem('isAutoriserDashPAT', isAutho.toString());
      console.log("tokony tonga ato izy");
      
    }, error => {
      // Handle the error (optional)
      console.error('Error during authentication:', error);
    });
  }
  


}
