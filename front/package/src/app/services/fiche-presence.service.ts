import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichePresenceService {

  private urlValiderProf = Constants.BASE_URL+'/presences/validerProf';
  private urlValiderDelegue = Constants.BASE_URL+'/presences/validerDelegue';
  private urlCoursEstAnnule = Constants.BASE_URL+'/presences/estAnnule';

  constructor(private http: HttpClient) { }

  validerProf(idEdt: string): Observable<any> {
    return this.http.put(
        `${this.urlValiderProf}`,
        null,
        { params: { idEdt: idEdt.toString() }, responseType: 'text' }  // <-- Ajout du responseType
    ).pipe(
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        })
    );
}




  
validerDelegue(idEdt: string, tokenValue: string): Observable<any> {
  return this.http.put(
      `${this.urlValiderDelegue}`,
      null,
      {
          params: { idEdt: idEdt.toString() },
          headers: { 'Authorization': tokenValue },
          responseType: 'text'  // <-- Ajout du responseType
      }
  ).pipe(
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
      })
  );
}

estAnnule(idEdt: number): Observable<any> {
  const params = new HttpParams().set('idEdt', idEdt.toString());

  return this.http.get(`${this.urlCoursEstAnnule}`, { params: params }).pipe(
    catchError((error: any) => {
      console.error('Error during API call:', error);
      throw error;
    })
  );
}

}
