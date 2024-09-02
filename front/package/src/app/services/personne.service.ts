import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { catchError, Observable, of } from 'rxjs';
import { Personne } from '../modeles/Personne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private http: HttpClient) { }
  private urlInfoPersonne = Constants.BASE_URL_COMMON+'/personnes/info';
  
  getInfoUtilisateur(token: string): Observable<Personne> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Personne>(`${this.urlInfoPersonne}`, { headers })
      .pipe(
        catchError(this.handleError<Personne>('getInfoUtilisateur'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
