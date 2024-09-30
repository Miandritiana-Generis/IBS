import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { catchError, Observable, of } from 'rxjs';
import { Absence } from '../modeles/Absence';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http: HttpClient,private auth:AuthService) { }
  private urlAbsence = Constants.BASE_URL+'/presences/absents';

  getAbsent(date1:string,date2:string,page:number): Observable<any> {
    const token=this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{
      "totalElements": number,
      "totalPages": number,
      "size": number,
      "content": Absence[]}>(`${this.urlAbsence}?dateDebut=${date1}&dateFin=${date2}&page=${page}`, { headers })
      .pipe(
        catchError(this.handleError<any>('getInfoUtilisateur'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
