import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichePresenceService {

  private urlValiderProf = Constants.BASE_URL+'/presences/validerProf';
  private urlValiderDelegue = Constants.BASE_URL+'/presences/validerDelegue';

  constructor(private http: HttpClient) { }

  validerProf(idEdt: string): Observable<any> {
    return this.http.put<any>(
        `${this.urlValiderProf}`,
        null,
        { params: { idEdt: idEdt.toString() } }
    ).pipe(
        catchError((error: HttpErrorResponse) => {
            // Throw the error to be handled in the component
            return throwError(error);
        })
    );
}


  
  validerDelegue(idEdt: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.urlValiderDelegue}`, 
      null, 
      { params: { idEdt: idEdt.toString() } }
    );
  }
}
